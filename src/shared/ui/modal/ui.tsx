import { useUnit } from 'effector-react';
import { $modal, closeModal } from './model';
import { Headline, IconButton, Modal } from '@telegram-apps/telegram-ui';
import { FC } from 'react';
import { X } from 'lucide-react';

export const ModalProvider: FC = () => {
  const { content, title } = useUnit($modal);

  return (
    <Modal
      header={
        <Modal.Header
          before={<Headline weight="3">{title}</Headline>}
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
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
      style={{ height: `calc(100vh - 100px)` }}
    >
      {content}
    </Modal>
  );
};
