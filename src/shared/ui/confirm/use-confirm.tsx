import { useModal } from '@/shared/ui/modal';
import { Confirm } from './ui';
import { ComponentProps, useCallback } from 'react';

export const useConfirm = () => {
  const { openModal, closeModal } = useModal();

  const confirm = useCallback((params: ComponentProps<typeof Confirm>) => {
    const cancel = () => {
      closeModal();
      params.onCancel?.();
    };
    openModal({
      title: 'Подтвердить действие',
      content: (
        <Confirm
          {...params}
          onCancel={cancel}
          onConfirm={() => {
            closeModal();
            params.onConfirm?.();
          }}
        />
      ),
      onClose: cancel,
    });
  }, []);

  return { confirm };
};
