import React, { useEffect, useState, useRef } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Discuit } from '@headz/discuit';
import { createFocusTrap } from 'focus-trap';
import { Scrollbars } from 'react-custom-scrollbars';
import { browserHasParentClass } from '~utils';
import { renderTrackVertical, renderThumbVertical } from '~components/Scrollbars';
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor, PlasmoGetStyle } from '~node_modules/plasmo';
import Notification from '~components/Notification';
import { Container, Inner, Footer, Header, Empty } from './notifications.styles';

/**
 * Export the Plasmo config.
 */
export const config: PlasmoCSConfig = {
  matches: ['https://discuit.net/*'],
  world: 'MAIN'
};

/**
 * Export the Plasmo style cache needed for styled components.
 */
const styleElement = document.createElement('style');
const styleCache = createCache({
  key: 'dt',
  prepend: true,
  container: styleElement
});
export const getStyle: PlasmoGetStyle = () => styleElement;

/**
 * The height of a notification.
 */
const notificationHeight = 60;

/**
 * The notifications button.
 */
const notificationsAnchor = '.notifications-button';

/**
 * Exports the notifications anchor to Plasmo.
 */
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  return document.querySelector(notificationsAnchor);
};

/**
 * The Discuit instance.
 */
const discuit = new Discuit();

/**
 * Displays the notifications popup.
 */
const NotificationsPopup = (): React.ReactElement | null => {
  const [isOpen, setOpen] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const countInterval = useRef(0);
  const count = document.querySelector('.notifications-count') as HTMLElement | null;
  const [autoHeightMin, setAutoHeightMin] = useState(0);
  const container = useRef() as React.MutableRefObject<HTMLDivElement>;
  const focusTrap = useRef() as React.MutableRefObject<ReturnType<typeof createFocusTrap>>;

  /**
   * Gets the notifications.
   */
  const fetchNotifications = () => {
    discuit
      .getNotifications()
      .then((_notifications) => {
        const filtered = _notifications.items.splice(0, 5);
        if (filtered.length === 0) {
          setAutoHeightMin(0);
        } else {
          setAutoHeightMin(filtered.length * notificationHeight < 250 ? filtered.length * notificationHeight : 250);
        }

        setNotifications(filtered);
        setLoaded(true);
        setUnreadCount(_notifications.items.filter((n) => !n.seen).length);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setLoaded(true);
      });
  };

  /**
   * Add event listeners to the notifications button.
   */
  useEffect(() => {
    const button = document.querySelector(notificationsAnchor);
    if (button) {
      // Tell screen readers that the button controls the notifications popup.
      button.setAttribute('aria-controls', 'dt-notifications');

      /**
       * Handles clicks on the notifications button.
       */
      const handleButtonClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      };
      button.addEventListener('click', handleButtonClick);

      return () => {
        button.removeEventListener('click', handleButtonClick);
      };
    }
  }, []);

  /**
   * Changes the count badge on the notifications button.
   */
  useEffect(() => {
    const setCount = () => {
      if (count) {
        count.classList.add('discuit-tools');

        if (unreadCount > 0) {
          count.style.display = 'block';
          count.textContent = unreadCount.toString();
        } else {
          count.style.display = 'none';
          document.title = document.title.replace(/\(\d+\)/, '');
        }
      }
    };

    // Prevent discuit from adding the count to the title, because that count also includes
    // upvote notifications.
    clearInterval(countInterval.current);
    countInterval.current = window.setInterval(setCount, 500);
    setCount();
  }, [unreadCount]);

  /**
   * Trap focus in the container when it opens. Also ensures the escape key closes the popup.
   */
  useEffect(() => {
    if (isOpen && !focusTrap.current) {
      fetchNotifications();

      /**
       * Keep focus trapped inside the container for accessibility.
       */
      focusTrap.current = createFocusTrap(container.current, {
        clickOutsideDeactivates: true
      });
      focusTrap.current.activate();

      /**
       * Handles clicks outside the popup.
       */
      const handleDocClick = (e: MouseEvent) => {
        if (isOpen && !browserHasParentClass(e.target as HTMLElement, 'dt-notifications')) {
          setOpen(false);
        }
      };
      document.addEventListener('click', handleDocClick, false);

      /**
       * Close the popup when the escape key is pressed.
       */
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown, false);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('click', handleDocClick);
      };
    } else if (!isOpen && focusTrap.current) {
      focusTrap.current.deactivate();
      focusTrap.current = null;

      // Return focus to the notifications button when the popup closes.
      const button = document.querySelector(notificationsAnchor) as HTMLElement | null;
      if (button) {
        button.focus();
      }
    }
  }, [isOpen]);

  /**
   * Handles the mark read button click.
   */
  const handleMarkRead = async () => {
    await discuit.markAllNotificationsAsSeen();
  };

  /**
   * Handles the mark deleted button click.
   */
  const handleMarkDeleted = async () => {
    await discuit.deleteAllNotifications();
    setNotifications([]);
  };

  /**
   * Handles the close button click.
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CacheProvider value={styleCache}>
      <Container
        $open={isOpen}
        ref={container}
        id="dt-notifications"
        className="dt-notifications"
        tabIndex={0}
        aria-expanded={isOpen}>
        <Header>
          <span
            role="button"
            tabIndex={0}
            onClick={handleMarkRead}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleMarkRead();
              }
            }}>
            Mark Read
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={handleMarkDeleted}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleMarkDeleted();
              }
            }}>
            Mark Deleted
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClose();
              }
            }}>
            Close
          </span>
        </Header>

        {isError && <Empty>There was an error loading notifications</Empty>}
        {notifications.length === 0 && isLoaded && <Empty>No notifications</Empty>}

        <Scrollbars
          autoHeight
          autoHeightMin={autoHeightMin}
          renderTrackVertical={renderTrackVertical}
          renderThumbVertical={renderThumbVertical}
          className="dt-scrollbars">
          <Inner>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                onClick={async () => {
                  await discuit.markNotificationAsSeen(notification.id);
                }}
              />
            ))}
          </Inner>
        </Scrollbars>
        <Footer>
          <a href="/notifications">See All</a>
        </Footer>
      </Container>
    </CacheProvider>
  );
};

export default NotificationsPopup;
