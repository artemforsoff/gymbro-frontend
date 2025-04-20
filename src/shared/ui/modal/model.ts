import { createEvent, createStore } from 'effector';
import { type ReactNode } from 'react';
import { type Nullable } from '@/shared/types/utility-types';

type ModalStore = { content: Nullable<ReactNode>; title: string; onClose?: () => void };

export const openModal = createEvent<ModalStore>();
export const closeModal = createEvent();

export const $modal = createStore<ModalStore>({ content: null, title: '' })
  .on(openModal, (_, content) => content)
  .reset(closeModal);
