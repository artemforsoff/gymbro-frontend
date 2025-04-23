import { type ComponentType, type FC, useState } from 'react';
import { type PageProps } from '@/pages/types';
import { UserParametersForm, UserProfileForm } from '@/features/user';
import { TabsList } from '@/shared/ui/kit';

export const ProfilePage: FC<PageProps> = () => {
  const DEFAULT_TAB_KEY = 'parameters';
  const tabs: { [key: string]: { content: ComponentType; text: string } } = {
    [DEFAULT_TAB_KEY]: {
      content: UserParametersForm,
      text: 'Параметры',
    },
    profile: {
      content: UserProfileForm,
      text: 'Профиль',
    },
  };

  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_KEY);

  const ActiveTab = tabs[activeTab].content;

  return (
    <>
      <TabsList
        onSelect={setActiveTab}
        items={Object.entries(tabs).map(([key, { text }]) => ({ key, text }))}
        selectedKey={activeTab}
      />

      <ActiveTab />
    </>
  );
};
