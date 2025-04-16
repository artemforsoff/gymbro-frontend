import { useUnit } from 'effector-react';
import { $modal, closeModal } from '../model';
import { IconButton, Modal, type ModalProps, Subheadline } from '@telegram-apps/telegram-ui';
import { FC } from 'react';
import { X } from 'lucide-react';
import styles from './styles.module.scss';

export const ModalProvider: FC = () => {
  const { content, title } = useUnit($modal);

  const handleChange: ModalProps['onOpenChange'] = (open) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Modal
      className={styles.modal}
      header={
        <Modal.Header
          before={
            <Subheadline size={3} weight="3">
              {title}
            </Subheadline>
          }
          after={
            <Modal.Close>
              <IconButton mode="plain" size="s">
                <X />
              </IconButton>
            </Modal.Close>
          }
        />
      }
      open={Boolean(content)}
      onOpenChange={handleChange}
    >
      {content}
    </Modal>
  );
};
