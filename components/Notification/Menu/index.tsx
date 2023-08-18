import React, { useEffect, useRef } from 'react';
import { createFocusTrap } from 'focus-trap';
import { Component } from './styles';

export interface Props {
  id: number;
  onClose: () => void;
  onRead: (e: React.MouseEvent | React.KeyboardEvent, id: number) => void;
  onDelete: (e: React.MouseEvent | React.KeyboardEvent, id: number) => void;
}

/**
 * Renders the notification menu.
 *
 * @param id The notification id.
 * @param onClose The callback to call when the menu is closed.
 * @param onRead The callback to call when the notification is marked as read.
 * @param onDelete The callback to call when the notification is deleted.
 */
const Menu = ({ id, onClose, onRead, onDelete }: Props): React.ReactElement | null => {
  const container = useRef() as React.MutableRefObject<HTMLUListElement>;
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
        }}
      >
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
        }}
      >
        Delete
      </li>
    </Component>
  );
};

export default Menu;
