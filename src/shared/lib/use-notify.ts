import { showNotification } from '@/entities/notification';
import type { NotificationType } from '@/entities/notification';

export const useNotify = () => {
  const notify = (text: string, type: NotificationType = 'info') => {
    showNotification({ text, type });
  };

  return {
    success: (text: string) => notify(text, 'success'),
    error: (text: string) => notify(text, 'error'),
    info: (text: string) => notify(text, 'info'),
    notify,
  };
};
