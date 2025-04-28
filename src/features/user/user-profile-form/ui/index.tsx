import { useEffect, type FC } from 'react';
import { useUnit } from 'effector-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userModel } from '@/entities/user/model';
import { updateProfileFx } from '../model';
import styles from './styles.module.scss';
import { DateTime } from 'luxon';
import { Button, DatePicker, Input } from '@/shared/ui/kit';
import { toast } from 'react-toastify';

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'Обязательное поле'),
  lastName: z.string().optional(),
  birthDate: z
    .date({ invalid_type_error: 'Обязательное поле' })
    .refine((val) => (val ? val <= DateTime.utc().toJSDate() : true), {
      message: 'Дата не может быть в будущем',
    }),
});

type ProfileFormData = z.infer<typeof updateProfileSchema>;

export const UserProfileForm: FC = () => {
  const user = useUnit(userModel.stores.$user);
  const isLoading = useUnit(updateProfileFx.pending);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
      });
    }
  }, [user]);

  const onSubmit = (data: ProfileFormData) => {
    if (!data.birthDate) return;

    const birthDateISO = data.birthDate?.toISOString();

    updateProfileFx({
      ...data,
      birthDate: birthDateISO,
      lastName: data.lastName || user?.lastName || '',
    })
      .then(() => {
        toast.success('Данные успешно сохранены');
      })
      .catch(() => {
        toast.error('Произошла ошибка');
      });
  };

  return (
    <form className={styles['user-profile-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Имя" error={errors.firstName?.message} {...register('firstName')} />

      <Input label="Фамилия" error={errors.lastName?.message} {...register('lastName')} />

      <Controller
        name="birthDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="yyyy-MM-dd"
            label="Дата рождения"
            error={errors.birthDate?.message}
          />
        )}
      />

      <Button type="submit" loading={isLoading}>
        Сохранить
      </Button>
    </form>
  );
};
