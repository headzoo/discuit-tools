import React, { useEffect, useState, useRef } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Discuit } from '@headz/discuit';
import { createFocusTrap } from 'focus-trap';
import { Scrollbars } from 'react-custom-scrollbars';
import { onCreation } from '~utils/NodeCreationObserver';
import { renderTrackVertical, renderThumbVertical } from '~components/Scrollbars';
import { browserHasParentClass } from '~utils';
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor, PlasmoGetStyle } from 'plasmo';
import Notification from '~components/Notification';
import Button from '~components/Button';
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

export interface INotificationContext {
  discuit: Discuit;
  closeMenus: (() => void)[];
}

export const NotificationsContext = React.createContext({} as INotificationContext);

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
  const notificationsInterval = useRef(0);
  const [autoHeightMin, setAutoHeightMin] = useState(0);
  const container = useRef() as React.MutableRefObject<HTMLDivElement>;
  const focusTrap = useRef() as React.MutableRefObject<ReturnType<typeof createFocusTrap>>;
  const closeMenus = useRef<(() => void)[]>([]);

  /**
   * Gets the notifications.
   */
  const fetchNotifications = () => {
    discuit
      .getNotifications()
      .then((resp) => {
        const { items } = resp;
        const filtered = Array.from(items).splice(0, 5);

        if (filtered.length === 0) {
          setAutoHeightMin(0);
        } else {
          setAutoHeightMin(filtered.length * notificationHeight < 250 ? filtered.length * notificationHeight : 250);
        }

        setNotifications(filtered);
        setUnreadCount(items.filter((n) => !n.seen).length);
        setLoaded(true);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setLoaded(true);
      });
  };

  /**
   * Add event listeners to the notifications button and start watching for new notifications.
   */
  useEffect(() => {
    fetchNotifications();
    notificationsInterval.current = window.setInterval(fetchNotifications, 15000);

    const off = onCreation(notificationsAnchor, (element) => {
      element.setAttribute('aria-controls', notificationsAnchor.slice(1));
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      });
    });

    return () => {
      off();
      clearInterval(notificationsInterval.current);
    };
  }, []);

  /**
   * Prevent discuit from adding the count to the title, because that count also includes
   * upvote notifications.
   */
  useEffect(() => {
    // Set count badge.
    const setCount = () => {
      console.log('setCount', unreadCount);
      const button = document.querySelector(notificationsAnchor) as HTMLElement;
      if (button) {
        let count = document.querySelector('.notifications-count') as HTMLElement;
        if (!count) {
          count = document.createElement('div');
          count.classList.add('count');
          button.appendChild(count);
        }

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

    const offTitle = onCreation('title', setCount);
    const offAnchor = onCreation(notificationsAnchor, setCount);
    setCount();

    return () => {
      offTitle();
      offAnchor();
    };
  }, [unreadCount]);

  /**
   * Trap focus in the container when it opens and ensures the escape key closes the popup.
   */
  useEffect(() => {
    if (isOpen && !focusTrap.current) {
      // Keep focus trapped inside the container for accessibility.
      focusTrap.current = createFocusTrap(container.current, {
        clickOutsideDeactivates: true,
        initialFocus: false
      });
      focusTrap.current.activate();

      // Handles clicks outside the popup.
      const handleDocClick = (e: MouseEvent) => {
        if (isOpen && !browserHasParentClass(e.target as HTMLElement, 'dt-notifications')) {
          setOpen(false);
        }
      };
      document.addEventListener('click', handleDocClick);

      // Close the popup when the escape key is pressed.
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          console.log('first');
          setOpen(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('click', handleDocClick);
      };
    } else if (!isOpen && focusTrap.current) {
      focusTrap.current.deactivate();
      focusTrap.current = null;

      // We're closing, so close all the menus too.
      for (let i = 0; i < closeMenus.current.length; i++) {
        closeMenus.current[i]();
      }
      closeMenus.current = [];

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
        tabIndex={0}
        id="dt-notifications"
        className="dt-notifications"
        aria-expanded={isOpen}>
        <Header>
          <Button
            tabIndex={0}
            onClick={handleMarkRead}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleMarkRead();
              }
            }}>
            Mark Read
          </Button>
          <Button
            tabIndex={0}
            onClick={handleMarkDeleted}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleMarkDeleted();
              }
            }}>
            Mark Deleted
          </Button>
          <Button
            tabIndex={0}
            className="dt-close"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClose();
              }
            }}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001">
              <path
                d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z"
                strokeWidth="2"
              />
            </svg>
          </Button>
        </Header>

        {isError && <Empty>There was an error loading notifications</Empty>}
        {notifications.length === 0 && isLoaded && <Empty>No notifications</Empty>}

        <NotificationsContext.Provider
          value={{
            discuit,
            closeMenus: closeMenus.current
          }}>
          <Scrollbars
            autoHeight
            autoHeightMin={autoHeightMin}
            renderTrackVertical={renderTrackVertical}
            renderThumbVertical={renderThumbVertical}
            className="dt-scrollbars">
            <Inner role="list">
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
        </NotificationsContext.Provider>
        <Footer>
          <a href="/notifications">See All</a>
        </Footer>
      </Container>
    </CacheProvider>
  );
};

export default NotificationsPopup;
