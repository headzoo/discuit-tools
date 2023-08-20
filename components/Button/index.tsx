import React, { useMemo } from 'react';
import { isDarkMode } from '~utils';
import { Component } from './styles';

export interface Props {
  variant?: 'default' | 'none';
  type?: 'button' | 'submit' | 'reset';
  title?: string;
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
  ({ variant = 'none', type = 'button', title, className, tabIndex, children, onClick, onKeyDown }: Props, ref) => {
    /**
     * Whether the button is rendered in dark mode.
     */
    const isDark = useMemo(() => isDarkMode(), []);

    return (
      <Component
        $dark={isDark}
        ref={ref}
        type={type}
        title={title}
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
