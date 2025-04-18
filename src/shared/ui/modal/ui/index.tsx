import { FC } from 'react';
import { useUnit } from 'effector-react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { $modal, closeModal } from '../model';
import { IconButton } from '@/shared/ui/kit';
import './styles.scss';

export const ModalProvider: FC = () => {
  const { content, title } = useUnit($modal);

  return (
    <Modal
      isOpen={Boolean(content)}
      onRequestClose={() => closeModal()}
      className="gb-modal"
      overlayClassName="gb-modal__overlay"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={false}
    >
      <header className="gb-modal__header">
        <h6 className="gb-modal__title">{title}</h6>

        <IconButton onClick={() => closeModal()}>
          <X />
        </IconButton>
      </header>
      {content}
    </Modal>
  );
};
