import React, { useEffect } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Discuit } from '@headz/discuit';
import type { User, Community } from '@headz/discuit';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { waitUntilElement, insertAfter } from '~/utils';

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
 * The Discuit instance.
 */
const discuit = new Discuit();

/**
 * The authenticated user.
 */
let user: User | undefined;

/**
 * Adds the list of moderating discs to the left sidebar.
 */
const LeftSidebar = (): React.ReactElement | null => {
  /**
   * Adds the "MODERATE" topic to the left sidebar.
   */
  useEffect(() => {
    const insertModerate = async (modding: Community, topic: HTMLElement) => {
      const moddingItem = document.createElement('a');
      moddingItem.className = 'sidebar-item with-image';
      moddingItem.href = `/${modding.name}`;

      const thumb = document.createElement('div');
      // <div className="pro-pic-img is-image is-no-hover" style="background-color: rgb(61, 61, 61); background-image: url(&quot;/favicon.png&quot;);"><img alt="AdvertiseYourDisc's profile" src="/favicon.png"></div>
      thumb.className = 'pro-pic-img is-image is-no-hover';
      thumb.style.backgroundColor = 'rgb(61, 61, 61)';
      thumb.style.backgroundImage = `url("${modding.proPic.url}")`;
      moddingItem.appendChild(thumb);

      // <img alt="autotldr's profile" src="/images/1001/17797f7e416dc7c58e203569.jpg?size=50x50&amp;fit=cover">
      const img = document.createElement('img');
      img.alt = `${modding.name}'s profile`;
      img.src = `${modding.proPic.url}?size=50x50&fit=cover`;
      thumb.appendChild(img);

      const title = document.createElement('span');
      title.innerHTML = modding.name;
      moddingItem.appendChild(title);

      insertAfter(moddingItem, topic);
    };

    waitUntilElement<HTMLElement>('.sidebar-item[href="/guidelines"]').then(async (sidebarItem) => {
      if (sidebarItem) {
        const topic = document.createElement('div');
        topic.className = 'sidebar-topic';
        topic.innerHTML = 'MODERATE';
        insertAfter(topic, sidebarItem);

        if (!user) {
          discuit.getMe().then(async (_user) => {
            user = _user;
            if (user && user.moddingList) {
              for (let i = 0; i < user.moddingList.length; i++) {
                const modding = user.moddingList[i];
                await insertModerate(modding, topic);
              }
            }
          });
        } else {
          if (user && user.moddingList) {
            for (let i = 0; i < user.moddingList.length; i++) {
              const modding = user.moddingList[i];
              await insertModerate(modding, topic);
            }
          }
        }
      }
    });
  }, []);

  return (
    <CacheProvider value={styleCache}>
      <div />
    </CacheProvider>
  );
};

export default LeftSidebar;