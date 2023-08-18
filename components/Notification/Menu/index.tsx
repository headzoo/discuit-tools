import React, { useEffect, useRef } from 'react';
import { createFocusTrap } from 'focus-trap';
import { Component } from './styles';

export interface Props {
  id: string;
  onClose: () => void;
  onRead: (e: React.MouseEvent, id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

const Menu = ({ id, onClose, onRead, onDelete }: Props): React.ReactElement | null => {
  const container = useRef() as React.MutableRefObject<HTMLDivElement>;
  const focusTrap = useRef() as React.MutableRefObject<ReturnType<typeof createFocusTrap>>;

  /**
   * Keep focus trapped inside the container for accessibility.
   */
  useEffect(() => {
    focusTrap.current = createFocusTrap(container.current, {
      clickOutsideDeactivates: true,
      initialFocus: false
    });
    focusTrap.current.activate();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      focusTrap.current.deactivate();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Component ref={container}>
      <li
        role="button"
        tabIndex={0}
        onClick={(e) => onRead(e, id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onRead(e, id);
          }
        }}>
        Mark Read
      </li>
      <li
        role="button"
        tabIndex={0}
        onClick={(e) => onDelete(e, id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onDelete(e, id);
          }
        }}>
        Delete
      </li>
    </Component>
  );
};

export default Menu;
