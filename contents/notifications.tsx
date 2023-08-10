import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Discuit } from '@headz/discuit';
import React, { useEffect, useState, useRef } from 'react';
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor, PlasmoGetStyle } from '~node_modules/plasmo';
import { browserHasParentClass } from '~utils';
import { Scrollbars } from 'react-custom-scrollbars';
import { renderTrackVertical, renderThumbVertical } from '~components/Scrollbars';

import { Container, Inner, Item, Icon, Footer, Header } from './notifications.styles';

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

const discuit = new Discuit();

const NotificationsPopup = (): React.ReactElement | null => {
  const [isOpen, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const interval = useRef(0);

  /**
   * Handles clicks outside the popup.
   *
   * @param e
   */
  const handleDocClick = (e: MouseEvent) => {
    if (isOpen && !browserHasParentClass(e.target as HTMLElement, 'dt-notifications')) {
      setOpen(false);
    }
  };

  /**
   * Handles clicks on the notifications button.
   *
   * @param e
   */
  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  /**
   *
   */
  useEffect(() => {
    discuit.getAllNotifications(5).then((_notifications) => {
      setNotifications(_notifications.filter((notification) => notification.type === 'new_comment'));
    });

    interval.current = window.setInterval(() => {
      discuit.getAllNotifications(5).then((_notifications) => {
        setNotifications(_notifications.filter((notification) => notification.type === 'new_comment'));
      });
    }, 30000);
  }, []);

  /**
   *
   */
  useEffect(() => {
    const count = document.querySelector('.notifications-count') as HTMLElement | null;
    if (count) {
      if (notifications.length > 0) {
        count.style.display = 'block';
        count.textContent = notifications.length.toString();
      } else {
        count.style.display = 'none';
      }
    }
  }, [notifications]);

  /**
   *
   */
  useEffect(() => {
    const button = document.querySelector('.notifications-button');
    if (button) {
      button.addEventListener('click', handleButtonClick);
      document.addEventListener('click', handleDocClick);

      return () => {
        button.removeEventListener('click', handleButtonClick);
        document.removeEventListener('click', handleDocClick);
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <CacheProvider value={styleCache}>
      <Container className="dt-notifications">
        <Header>
          <span
            onClick={async () => {
              await discuit.markAllNotificationsAsSeen();
            }}>
            Mark Read
          </span>
          <span
            onClick={async () => {
              await discuit.deleteAllNotifications();
              setNotifications([]);
            }}>
            Mark Deleted
          </span>
        </Header>

        <Scrollbars
          autoHeight
          autoHeightMin={250}
          renderTrackVertical={renderTrackVertical}
          renderThumbVertical={renderThumbVertical}>
          <Inner>
            {notifications.map((n) => (
              <Item
                key={n.id}
                className={n.seen ? '' : 'unseen'}
                href={`/${n.notif.post.communityName}/post/${n.notif.post.publicId}/${n.notif.commentId}`}
                onClick={async () => {
                  await discuit.markNotificationAsSeen(n.id);
                }}>
                <Icon>
                  <img src={n.notif.post?.communityProPic?.url || ''} alt="" />
                </Icon>
                <div>
                  @{n.notif.commentAuthor} on {n.notif.post.title}
                </div>
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
