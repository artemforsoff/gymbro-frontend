import { type FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userModel } from '@/entities/user/model/index';
import { toZodEnum } from '@/shared/lib';
import { activityLevelOptions, genderOptions, goalOptions } from '../shared/options';
import { ACTIVITY_LEVELS, GENDERS, GOALS } from '@/shared/constants/user-parameter';
import { setUserParametersFx } from '../model';
import styles from './styles.module.scss';
import { Button, Input, Select } from '@/shared/ui/kit';
import { floatNumberSchema } from '@/shared/lib/zod';
import { toDecimals } from '@/shared/lib/to-decimals';
import { toast } from 'react-toastify';

const userParamsSchema = z.object({
  weight: floatNumberSchema(),
  height: floatNumberSchema(),
  activityLevel: toZodEnum(Object.values(activityLevelOptions).map(({ value }) => value)),
  goal: toZodEnum(Object.values(goalOptions).map(({ value }) => value)),
  sex: toZodEnum(Object.values(genderOptions).map(({ value }) => value)),
});

type UserParameters = z.infer<typeof userParamsSchema>;

export const UserParametersForm: FC = () => {
  const userParameters = useUnit(userModel.stores.$actualUserParameters);
  const isLoading = useUnit(userModel.effects.getUserParametersByDateFx.pending);

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
    const { activityLevel, goal, height, sex, weight } = data;

    setUserParametersFx({
      weight: String(weight),
      height,
      activityLevel,
      goal,
      sex,
    })
      .then(() => {
        toast.success(`Данные успешно ${userParameters === null ? 'сохранены' : 'обновлены'}`);
      })
      .catch(() => {
        toast.error('Произошла ошибка');
      });
  };

  const parseDecimalInput = (value: string) => {
    if (typeof value === 'string') {
      return toDecimals(parseFloat(value.replace(',', '.')), 2);
    }
    return toDecimals(value, 2);
  };

  return (
    <form className={styles['user-parameters-form']} onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Гендер"
        value={watch('sex')}
        onChange={(e) => setValue('sex', e.target.value as UserParameters['sex'])}
        error={errors.sex?.message}
      >
        {Object.values(genderOptions).map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Input
        label="Вес"
        postfix="кг"
        inputMode="decimal"
        error={errors.weight?.message}
        {...register('weight', {
          setValueAs: parseDecimalInput,
        })}
      />

      <Input
        label="Рост"
        postfix="см"
        inputMode="numeric"
        error={errors.height?.message}
        {...register('height', { valueAsNumber: true })}
      />

      <Select
        label="Цель"
        value={watch('goal')}
        onChange={(e) => setValue('goal', e.target.value as UserParameters['goal'])}
        error={errors.goal?.message}
      >
        {Object.values(goalOptions).map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Select
        label="Уровень активности"
        value={watch('activityLevel')}
        onChange={(e) =>
          setValue('activityLevel', e.target.value as UserParameters['activityLevel'])
        }
        error={errors.activityLevel?.message}
      >
        {Object.values(activityLevelOptions).map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Button type="submit" loading={isLoading}>
        Сохранить
      </Button>
    </form>
  );
};
