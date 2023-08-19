import React from 'react';
import { Component } from './styles';

export interface Props {
  variant?: 'default' | 'none';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  tabIndex?: number;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/**
 * Renders a button.
 */
const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'none', type = 'button', className, tabIndex, children, onClick, onKeyDown }: Props, ref) => {
    return (
      <Component
        ref={ref}
        type={type}
        className={`btn-${variant} ${className}`}
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </Component>
    );
  }
);

export default Button;
