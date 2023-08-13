import React, { useEffect, useState, useRef } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Discuit } from '@headz/discuit';
import { createFocusTrap } from 'focus-trap';
import { Scrollbars } from 'react-custom-scrollbars';
import { browserHasParentClass } from '~utils';
import { renderTrackVertical, renderThumbVertical } from '~components/Scrollbars';
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor, PlasmoGetStyle } from '~node_modules/plasmo';
import { Container, Inner, Item, Icon, Footer, Header, Body, Empty } from './notifications.styles';

const styleElement = document.createElement('style');
const styleCache = createCache({
  key: 'plasmo-emotion-cache',
  prepend: true,
  container: styleElement
});

export const getStyle: PlasmoGetStyle = () => styleElement;

export const config: PlasmoCSConfig = {
  matches: ['https://discuit.net/*'],
  world: 'MAIN'
};

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  return document.querySelector('.notifications-button');
};

/**
 * The Discuit instance.
 */
const discuit = new Discuit();

/**
 * The height of a notification.
 */
const notificationHeight = 60;

/**
 * Displays the notifications popup.
 */
const NotificationsPopup = (): React.ReactElement | null => {
  const [isOpen, setOpen] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
          setAutoHeightMin(filtered.length * notificationHeight);
        }

        setNotifications(filtered);
        if (!isLoaded) {
          setLoaded(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  /**
   * Add event listeners to the notifications button.
   */
  useEffect(() => {
    const button = document.querySelector('.notifications-button');
    if (button) {
      /**
       * Handles clicks on the notifications button.
       */
      const handleButtonClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      };

      // Tell aria that the button controls the notifications popup.
      button.setAttribute('aria-controls', 'dt-notifications');
      button.addEventListener('click', handleButtonClick);

      return () => {
        button.removeEventListener('click', handleButtonClick);
      };
    }
  }, []);

  /**
   * Loads the notifications when the popup opens.
   */
  useEffect(() => {
    if (isOpen) {
      setLoaded(false);
      fetchNotifications();
    }
  }, [isOpen]);

  /**
   * Trap focus in the container when it opens. Also ensures the escape key closes the popup.
   */
  useEffect(() => {
    if (isOpen && !focusTrap.current) {
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
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

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
            onClick={async () => {
              await discuit.markAllNotificationsAsSeen();
            }}>
            Mark Read
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={async () => {
              await discuit.deleteAllNotifications();
              setNotifications([]);
            }}>
            Mark Deleted
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
            {notifications.map((n) => (
              <Item
                key={n.id}
                tabIndex={0}
                className={n.seen ? '' : 'unseen'}
                href={`/${n.notif.post.communityName}/post/${n.notif.post.publicId}/${n.notif.commentId}`}
                onClick={async () => {
                  await discuit.markNotificationAsSeen(n.id);
                }}>
                <Icon aria-hidden={true}>
                  <img src={n.notif.post?.communityProPic?.url || ''} alt="" />
                </Icon>
                <Body>
                  <div className="username">@{n.notif.commentAuthor}</div>{' '}
                  <div className="title">replied {n.notif.post.title}</div>
                </Body>
              </Item>
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
