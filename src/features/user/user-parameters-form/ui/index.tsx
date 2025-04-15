import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button, Section } from '@telegram-apps/telegram-ui';
import { userModel } from '@/entities/user/model';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useNotify } from '@/shared/lib/use-notify';

const userParamsSchema = z.object({
  weight: z.number({ invalid_type_error: 'Введите число' }),
  height: z.number({ invalid_type_error: 'Введите число' }),
  activityLevel: z.enum(['low', 'medium', 'high']),
  goal: z.enum(['lose', 'maintain', 'gain']),
  sex: z.enum(['male', 'female']),
});

type UserParameters = z.infer<typeof userParamsSchema>;

export const UserParametersForm = () => {
  const $userParameters = useUnit(userModel.stores.$userParameters);

  const notify = useNotify();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UserParameters>({
    resolver: zodResolver(userParamsSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if ($userParameters) {
      reset({
        activityLevel: $userParameters.activityLevel,
        goal: $userParameters.goal,
        height: $userParameters.height,
        sex: $userParameters.sex,
        weight: Number($userParameters.weight),
      });
    }
  }, [$userParameters]);

  const onSubmit = (data: UserParameters) => {
    const { activityLevel, goal, height, sex, weight } = data;

    userModel.effects
      .setUserParametersFx({
        weight: String(weight),
        height,
        activityLevel,
        goal,
        sex,
      })
      .then(() => {
        notify.success('Данные успешно сохранены');
      })
      .catch(() => {
        notify.error('Произошла ошибка');
      });
  };

  return (
    <Section header="Цели и параметры">
      <form onSubmit={handleSubmit(onSubmit)} className={styles['user-parameters-form']}>
        <Select
          value={watch('sex')}
          onChange={(e) => setValue('sex', e.target.value as UserParameters['sex'])}
          status={errors.sex ? 'error' : undefined}
        >
          <option value="">Гендер</option>
          {[
            { label: 'Мужской', value: 'male' },
            { label: 'Женский', value: 'female' },
          ].map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Input
          placeholder="Вес (кг)"
          type="number"
          status={errors.weight ? 'error' : undefined}
          {...register('weight', { valueAsNumber: true })}
        />

        <Input
          placeholder="Рост (см)"
          type="number"
          status={errors.height ? 'error' : undefined}
          {...register('height', { valueAsNumber: true })}
        />

        <Select
          value={watch('goal')}
          onChange={(e) => setValue('goal', e.target.value as UserParameters['goal'])}
          status={errors.goal ? 'error' : undefined}
        >
          <option value="">Цель</option>
          {[
            { label: 'Похудение', value: 'lose' },
            { label: 'Набор массы', value: 'gain' },
            { label: 'Поддержание', value: 'maintain' },
          ].map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Select
          value={watch('activityLevel')}
          onChange={(e) =>
            setValue('activityLevel', e.target.value as UserParameters['activityLevel'])
          }
          status={errors.activityLevel ? 'error' : undefined}
        >
          <option value="">Уровень активности</option>
          {[
            { label: 'Низкий', value: 'low' },
            { label: 'Средний', value: 'medium' },
            { label: 'Высокий', value: 'high' },
          ].map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Button type="submit">Сохранить</Button>
      </form>
    </Section>
  );
};
