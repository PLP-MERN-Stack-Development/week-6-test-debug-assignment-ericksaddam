import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', size = 'md', disabled = false, onClick, className = '', ...rest }) => {
  let variantClass = '';
  switch (variant) {
    case 'secondary':
      variantClass = 'btn-secondary';
      break;
    case 'danger':
      variantClass = 'btn-danger';
      break;
    default:
      variantClass = 'btn-primary';
  }

  let sizeClass = '';
  switch (size) {
    case 'sm':
      sizeClass = 'btn-sm';
      break;
    case 'md':
      sizeClass = 'btn-md';
      break;
    case 'lg':
      sizeClass = 'btn-lg';
      break;
    default:
      sizeClass = '';
  }

  const classes = [
    'btn',
    variantClass,
    sizeClass,
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
