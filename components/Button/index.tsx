import React from 'react';
import classNames from 'classnames';
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

const Button = ({
  variant = 'none',
  type = 'button',
  className,
  tabIndex,
  children,
  onClick,
  onKeyDown
}: Props): React.ReactElement | null => {
  return (
    <Component
      type={type}
      className={`btn-${variant} ${className}`}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}>
      {children}
    </Component>
  );
};

export default Button;
