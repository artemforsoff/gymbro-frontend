import { useEffect, type FC } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userModel } from '@/entities/user/model';
import { useNotify } from '@/shared/ui/snackbar';
import { updateProfileFx } from '../model';
import styles from './styles.module.scss';
import { DateTime } from 'luxon';
import { Button, Input } from '@/shared/ui/kit';

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'Обязательное поле'),
  lastName: z.string().optional(),
  birthDate: z.string().refine(
    (val) => {
      const date = DateTime.fromISO(val, { zone: 'utc' });
      return date.isValid && date <= DateTime.utc();
    },
    {
      message: 'Дата не может быть в будущем',
    },
  ),
});

type ProfileFormData = z.infer<typeof updateProfileSchema>;

export const UserProfileForm: FC = () => {
  const notify = useNotify();
  const user = useUnit(userModel.stores.$user);
  const isLoading = useUnit(updateProfileFx.pending);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        birthDate: user.birthDate?.split('T')[0] ?? '',
      });
    }
  }, [user]);

  const onSubmit = (data: ProfileFormData) => {
    const birthDateISO = DateTime.fromFormat(data.birthDate, 'yyyy-MM-dd', { zone: 'utc' }).toISO();

    updateProfileFx({
      ...data,
      birthDate: birthDateISO,
      lastName: data.lastName || user?.lastName || '',
    })
      .then(() => notify.success('Профиль обновлён'))
      .catch(() => notify.error('Ошибка при обновлении профиля'));
  };

  return (
    <form className={styles['user-profile-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Имя" error={errors.firstName?.message} {...register('firstName')} />

      <Input label="Фамилия" error={errors.lastName?.message} {...register('lastName')} />

      <Input
        label="Дата рождения"
        type="date"
        error={errors.birthDate?.message}
        {...register('birthDate')}
      />

      <Button type="submit" loading={isLoading}>
        Сохранить
      </Button>
    </form>
  );
};
