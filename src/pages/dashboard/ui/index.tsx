import { type FC } from 'react';
import { Page } from '@/shared/ui/page';
import { Link } from '@/shared/ui/link';

export const DashboardPage: FC = () => {
  return (
    <Page back={false}>
      <Link to="/profile">go to user profile</Link>
    </Page>
  );
};
