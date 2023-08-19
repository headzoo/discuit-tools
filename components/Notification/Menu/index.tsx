import React, { useEffect, useRef } from 'react';
import { createFocusTrap } from 'focus-trap';
import { Component } from './styles';

export interface Props {
  id: number;
  dark: boolean;
  onClose: () => void;
  onRead: (e: React.MouseEvent | React.KeyboardEvent, id: number) => void;
  onDelete: (e: React.MouseEvent | React.KeyboardEvent, id: number) => void;
}

/**
 * Renders the notification menu.
 *
 * @param id The notification id.
 * @param dark Whether the menu is rendered in dark mode.
 * @param onClose The callback to call when the menu is closed.
 * @param onRead The callback to call when the notification is marked as read.
 * @param onDelete The callback to call when the notification is deleted.
 */
const Menu = ({ id, dark, onRead, onDelete, onClose }: Props): React.ReactElement | null => {
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

    return () => {
      focusTrap.current.deactivate();
      onClose();
    };
  }, []);

  return (
    <Component ref={container} $dark={dark} className="dt-notifications-menu">
      <li
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRead(e, id);
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onRead(e, id);
            onClose();
          }
        }}
      >
        Mark Read
      </li>
      <li
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete(e, id);
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onDelete(e, id);
            onClose();
          }
        }}
      >
        Delete
      </li>
    </Component>
  );
};

export default Menu;
