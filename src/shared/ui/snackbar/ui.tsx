import { $notification, hideNotification } from './model';
import { useUnit } from 'effector-react';

export const SnackbarProvider = () => {
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

  return null;
  // <Snackbar
  //   onClose={hideNotification}
  //   duration={3000}
  //   style={{
  //     color: getTextColor(),
  //   }}
  // >
  //   {getIcon()} {notification.text}
  // </Snackbar>
};
