import { type Nullable } from '@/shared/types/utility-types';
import { createEvent, createStore, createEffect, sample } from 'effector';

export type NotificationType = 'success' | 'error' | 'info';

export type Notification = {
  text: string;
  type?: NotificationType;
};

export const showNotification = createEvent<Notification>();
export const hideNotification = createEvent();

export const $notification = createStore<Nullable<Notification>>(null)
  .on(showNotification, (_, payload) => payload)
  .reset(hideNotification);

const autoHideFx = createEffect(() => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 3000);
  });
});

sample({
  clock: showNotification,
  target: autoHideFx,
});

sample({
  clock: autoHideFx.done,
  target: hideNotification,
});
