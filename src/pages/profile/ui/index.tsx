import { UserParametersForm } from '@/features/user';
import { type PageProps } from '@/pages/types';
import { Divider, TabsList } from '@telegram-apps/telegram-ui';
import { ReactNode, useState, type FC } from 'react';

export const ProfilePage: FC<PageProps> = () => {
  const defaultTab = 'parameters';
  const tabs: { [key: string]: { content: ReactNode; text: string } } = {
    [defaultTab]: {
      content: <UserParametersForm />,
      text: 'Параметры',
    },
    profile: {
      content: <div>in the development</div>,
      text: 'Профиль',
    },
  };

  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <>
      <TabsList>
        {Object.entries(tabs).map(([key, { text }]) => (
          <TabsList.Item
            key={key}
            onClick={() => {
              setActiveTab(key);
            }}
            selected={activeTab === key}
          >
            {text}
          </TabsList.Item>
        ))}
      </TabsList>

      <Divider />

      {tabs[activeTab].content}
    </>
  );
};
