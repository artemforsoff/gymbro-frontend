import { createEffect, createEvent, createStore, sample } from 'effector';
import { type ReactNode } from 'react';
import { type Nullable } from '@/shared/types/utility-types';
import { CLOSE_TIMEOUT_MS } from './constants';

type ModalStore = {
  content: Nullable<ReactNode>;
  title: string;
  onClose?: () => void;
  isOpen: boolean;
};

export const openModal = createEvent<Omit<ModalStore, 'isOpen'>>();
const deleteModal = createEvent();
export const closeModal = createEvent();

export const $modals = createStore<ModalStore[]>([])
  .on(openModal, (state, modal) => [...state, { ...modal, isOpen: true }])
  .on(closeModal, (state) =>
    state.map((modal, index, { length }) =>
      index === length - 1 ? { ...modal, isOpen: false } : modal,
    ),
  )
  .on(deleteModal, (state) => state.slice(0, -1));

const delayFx = createEffect(() => new Promise((resolve) => setTimeout(resolve, CLOSE_TIMEOUT_MS)));

sample({
  clock: closeModal,
  target: delayFx,
});

sample({
  clock: delayFx.done,
  target: deleteModal,
});
