import React, { useEffect, useState, useContext, useRef } from 'react';
import type { Notification as DiscuitNotification } from '@headz/discuit';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Button from '~components/Button';
import { NotificationsContext } from '~contents/notifications';
import Menu from './Menu';
import { Item, Body, Icon, MenuDots } from './styles';

export interface Props {
  notification: DiscuitNotification;
  onClick: (e: React.MouseEvent, notification: DiscuitNotification) => void;
  onRead: (e: React.MouseEvent | React.KeyboardEvent, id: number) => void;
  onDelete: (e: React.MouseEvent | React.KeyboardEvent, id: number) => void;
}

/**
 * Renders a single notification.
 *
 * @param notification The notification to render.
 * @param onClick The callback to call when the notification is clicked.
 * @param onRead The callback to call when the notification is marked as read.
 * @param onDelete The callback to call when the notification is deleted.
 */
const Notification = ({ notification, onClick, onRead, onDelete }: Props): React.ReactElement | null => {
  const { closeMenus } = useContext(NotificationsContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('hidden');
  const menuButton = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const { post } = notification.notif;
  const href = `/${post.communityName}/post/${post.publicId}/${notification.notif.commentId}`;

  /**
   * Sets the visibility of the notification once the community image is loaded.
   */
  useEffect(() => {
    if (post?.communityProPic?.url) {
      const img = new Image();
      img.src = post?.communityProPic?.url || '';
      img.onload = () => setVisibility('visible');
    } else {
      setVisibility('visible');
    }
  }, [post]);

  /**
   * Prevents the notification from being clicked when the menu is clicked.
   * @param e
   */
  const handleMenuClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextOpenState = !isMenuOpen;
    for (let i = 0; i < closeMenus.current.length; i++) {
      closeMenus.current[i]();
    }
    setMenuOpen(nextOpenState);
    closeMenus.current = [() => setMenuOpen(false)];
  };

  return (
    <Item
      tabIndex={0}
      href={href}
      role="listitem"
      className={notification.seen ? '' : 'unseen'}
      onClick={(e) => {
        onClick(e, notification);
      }}
    >
      {visibility === 'hidden' && (
        <SkeletonTheme baseColor="#242424" highlightColor="#202020">
          <span className="loading-pic" />
          <Skeleton containerClassName="loading-container" count={2} />
        </SkeletonTheme>
      )}
      {visibility === 'visible' && (
        <>
          <Icon aria-hidden={true}>
            <img src={post?.communityProPic?.url || '/favicon.png'} alt="" onLoad={() => setVisibility('visible')} />
          </Icon>
          <Body>
            @{notification.notif.commentAuthor} replied to {post.title}
          </Body>
          <Button
            ref={menuButton}
            onClick={handleMenuClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleMenuClick(e);
              }
            }}
          >
            <MenuDots width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 14.75C3.48 14.75 2.25 13.52 2.25 12C2.25 10.48 3.48 9.25 5 9.25C6.52 9.25 7.75 10.48 7.75 12C7.75 13.52 6.52 14.75 5 14.75ZM5 10.75C4.31 10.75 3.75 11.31 3.75 12C3.75 12.69 4.31 13.25 5 13.25C5.69 13.25 6.25 12.69 6.25 12C6.25 11.31 5.69 10.75 5 10.75Z"
                fill="currentColor"
              />
              <path
                d="M19 14.75C17.48 14.75 16.25 13.52 16.25 12C16.25 10.48 17.48 9.25 19 9.25C20.52 9.25 21.75 10.48 21.75 12C21.75 13.52 20.52 14.75 19 14.75ZM19 10.75C18.31 10.75 17.75 11.31 17.75 12C17.75 12.69 18.31 13.25 19 13.25C19.69 13.25 20.25 12.69 20.25 12C20.25 11.31 19.69 10.75 19 10.75Z"
                fill="currentColor"
              />
              <path
                d="M12 14.75C10.48 14.75 9.25 13.52 9.25 12C9.25 10.48 10.48 9.25 12 9.25C13.52 9.25 14.75 10.48 14.75 12C14.75 13.52 13.52 14.75 12 14.75ZM12 10.75C11.31 10.75 10.75 11.31 10.75 12C10.75 12.69 11.31 13.25 12 13.25C12.69 13.25 13.25 12.69 13.25 12C13.25 11.31 12.69 10.75 12 10.75Z"
                fill="currentColor"
              />
            </MenuDots>
          </Button>
          {isMenuOpen && (
            <Menu
              id={notification.id}
              onRead={onRead}
              onDelete={onDelete}
              onClose={() => {
                setMenuOpen(false);
                menuButton.current?.focus();
              }}
            />
          )}
        </>
      )}
    </Item>
  );
};

export default Notification;
