import React from 'react';
import PropTypes from 'prop-types';
export default function Button({children, textOnly, className, ...props}) {
	let cssClasses = textOnly ? 'text-button' : 'button';
	cssClasses += ` ${className}`;
	return <button className={cssClasses} {...props}>{children}</button>;
}

Button.propTypes = {
	children: PropTypes.string,
	textOnly: PropTypes.bool,
	className: PropTypes.string,
};
