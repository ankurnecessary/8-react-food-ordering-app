import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {useEffect} from 'react';

export default function Modal({children, open, className = '', onClose}) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.querySelector('#modal'),
  );
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	open: PropTypes.bool.isRequired,
	className: PropTypes.string,
};
