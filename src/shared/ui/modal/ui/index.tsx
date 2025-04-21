import { type FC } from 'react';
import { useUnit } from 'effector-react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { $modals, closeModal } from '../model';
import { IconButton } from '@/shared/ui/kit';
import './styles.scss';
import { CLOSE_TIMEOUT_MS } from '../constants';

export const ModalProvider: FC = () => {
  const modals = useUnit($modals);

  return (
    <>
      {modals.map(({ content, title, onClose, isOpen }, index) => {
        const close = () => {
          onClose?.();
          closeModal();
        };

        return (
          <Modal
            key={index}
            isOpen={isOpen}
            onRequestClose={close}
            className="gb-modal"
            overlayClassName="gb-modal__overlay"
            closeTimeoutMS={CLOSE_TIMEOUT_MS}
            shouldCloseOnOverlayClick={false}
            style={{
              content: {
                height: `calc(100% - 100px - ${32 * index}px)`,
              },
            }}
          >
            <header className="gb-modal__header">
              <h6 className="gb-modal__title">{title}</h6>

              <IconButton onClick={close}>
                <X />
              </IconButton>
            </header>
            {content}
          </Modal>
        );
      })}
    </>
  );
};
