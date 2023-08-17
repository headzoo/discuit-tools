import React, { useEffect, useState } from 'react';
import type { Notification as DiscuitNotification } from '@headz/discuit';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Item, Body, Icon } from './styles';

export interface Props {
  notification: DiscuitNotification;
  onClick: (e: React.MouseEvent, notification: DiscuitNotification) => void;
}

/**
 * Renders a single notification.
 *
 * @param notification The notification to render.
 * @param onClick The callback to call when the notification is clicked.
 */
const Notification = ({ notification, onClick }: Props): React.ReactElement | null => {
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('hidden');
  const { post } = notification.notif;
  const href = `/${post.communityName}/post/${post.publicId}/${notification.notif.commentId}`;

  /**
   * Sets the visibility of the notification.
   */
  useEffect(() => {
    if (!post?.communityProPic?.url) {
      const img = new Image();
      img.src = post?.communityProPic?.url || '';
      img.onload = () => setVisibility('visible');
    } else {
      setVisibility('visible');
    }
  }, [post]);

  return (
    <Item
      tabIndex={0}
      href={href}
      onClick={(e) => onClick(e, notification)}
      className={notification.seen ? '' : 'unseen'}>
      {visibility === 'hidden' && (
        <SkeletonTheme baseColor="#242424" highlightColor="#202020">
          <span className="loading-pic" />
          <Skeleton containerClassName="loading-container" count={2} />
        </SkeletonTheme>
      )}
      {visibility === 'visible' && (
        <>
          <Icon aria-hidden={true}>
            {/* Wait until the image is loaded before making the notification visible. */}
            <img src={post?.communityProPic?.url || ''} alt="" onLoad={() => setVisibility('visible')} />
          </Icon>
          <Body>
            @{notification.notif.commentAuthor} replied to{' '}
            {post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
          </Body>
        </>
      )}
    </Item>
  );
};

export default Notification;
