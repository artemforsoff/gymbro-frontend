import { $notification, hideNotification } from '@/entities/notification';
import { Snackbar } from '@telegram-apps/telegram-ui';
import { useUnit } from 'effector-react';

export const SnackbarHost = () => {
  const notification = useUnit($notification);

  if (!notification) return null;

  const getTextColor = () => {
    return notification.type === 'error'
      ? 'var(--tg-theme-bg-color)'
      : 'var(--tg-theme-button-text-color)';
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <Snackbar
      onClose={hideNotification}
      duration={3000}
      style={{
        color: getTextColor(),
      }}
    >
      {getIcon()} {notification.text}
    </Snackbar>
  );
};
