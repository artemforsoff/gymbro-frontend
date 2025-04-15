import { UserParametersForm } from '@/features/user';
import { Page } from '@/shared/ui/page';
import { type FC } from 'react';

export const ProfilePage: FC = () => {
  return (
    <Page back>
      <UserParametersForm />
    </Page>
  );
};
