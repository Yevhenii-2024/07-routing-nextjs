import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';

interface NoteModalProps {
	onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
	function handleBackdrop(event: React.MouseEvent<HTMLDivElement>) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	useEffect(() => {
		function handleKeyboard(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyboard);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyboard);
			document.body.style.overflow = '';
		};
	}, [onClose]);

	return createPortal(
		<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
			<div className={css.modal}>
				<NoteForm onClose={onClose} />
			</div>
		</div>,
		document.body
	);
}