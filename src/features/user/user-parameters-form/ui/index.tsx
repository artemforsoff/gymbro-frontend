import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button, Section } from '@telegram-apps/telegram-ui';
import { userModel } from '@/entities/user/model/index';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useNotify } from '@/shared/ui/snackbar/use-notify';
import { toZodEnum } from '@/shared/lib';
import { activityLevelOptions, genderOptions, goalOptions } from '../shared/options';
import { ACTIVITY_LEVELS, GENDERS, GOALS } from '@/shared/constants/user-parameter';
import { setUserParametersFx } from '../model';

const userParamsSchema = z.object({
  weight: z.number({ invalid_type_error: 'Введите число' }),
  height: z.number({ invalid_type_error: 'Введите число' }),
  activityLevel: toZodEnum(Object.values(activityLevelOptions).map(({ value }) => value)),
  goal: toZodEnum(Object.values(goalOptions).map(({ value }) => value)),
  sex: toZodEnum(Object.values(genderOptions).map(({ value }) => value)),
});

type UserParameters = z.infer<typeof userParamsSchema>;

export const UserParametersForm = () => {
  const userParameters = useUnit(userModel.stores.$userParameters);

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
    defaultValues: {
      sex: GENDERS.male,
      activityLevel: ACTIVITY_LEVELS.medium,
      goal: GOALS.maintain,
    },
  });

  useEffect(() => {
    if (userParameters) {
      const { activityLevel, goal, height, sex, weight } = userParameters;

      reset({
        activityLevel,
        goal,
        height,
        sex,
        weight: Number(weight),
      });
    }
  }, [userParameters]);

  const onSubmit = (data: UserParameters) => {
    if (JSON.stringify(data) === JSON.stringify(userParameters)) {
      return notify.success('Данные успешно обновлены');
    }

    const { activityLevel, goal, height, sex, weight } = data;

    setUserParametersFx({
      weight: String(weight),
      height,
      activityLevel,
      goal,
      sex,
    })
      .then(() => {
        notify.success(`Данные успешно ${userParameters === null ? 'сохранены' : 'обновлены'}`);
      })
      .catch(() => {
        notify.error('Произошла ошибка');
      });
  };

  return (
    <Section header="Цели и параметры">
      <form className={styles['user-parameters-form']} onSubmit={handleSubmit(onSubmit)}>
        <Select
          header="Гендер"
          value={watch('sex')}
          onChange={(e) => setValue('sex', e.target.value as UserParameters['sex'])}
          status={errors.sex ? 'error' : undefined}
        >
          {Object.values(genderOptions).map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Input
          header="Вес (кг)"
          type="number"
          status={errors.weight ? 'error' : undefined}
          {...register('weight', { valueAsNumber: true })}
        />

        <Input
          header="Рост (см)"
          type="number"
          status={errors.height ? 'error' : undefined}
          {...register('height', { valueAsNumber: true })}
        />

        <Select
          header="Цель"
          value={watch('goal')}
          onChange={(e) => setValue('goal', e.target.value as UserParameters['goal'])}
          status={errors.goal ? 'error' : undefined}
        >
          {Object.values(goalOptions).map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Select
          header="Уровень активности"
          value={watch('activityLevel')}
          onChange={(e) =>
            setValue('activityLevel', e.target.value as UserParameters['activityLevel'])
          }
          status={errors.activityLevel ? 'error' : undefined}
        >
          {Object.values(activityLevelOptions).map(({ label, value }) => (
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
