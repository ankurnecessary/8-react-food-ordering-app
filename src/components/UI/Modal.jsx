import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {useEffect} from 'react';

export default function Modal({children, open, className = ''}) {
	const modal = useRef();

	useEffect(() => {
		if (open) {
			modal.current.showModal();
		} else {
			modal.current.hide();
		}
	}, [open]);

	return createPortal(
		<dialog ref={modal} className={`modal ${className}`}>
			{children}
		</dialog>,
		document.querySelector('#modal'),
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
};
