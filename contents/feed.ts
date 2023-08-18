import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { sendToBackground } from '@plasmohq/messaging';
import { onCreation } from '~utils/NodeCreationObserver';
import styleText from 'data-text:./feed.scss';

export const config: PlasmoCSConfig = {
  matches: ['https://discuit.net/*']
};

const head = document.querySelector('head');
if (head) {
  const style = document.createElement('style');
  style.textContent = styleText;
  head.appendChild(style);
}

/*onCreation('.user-card', (node) => {
  const newCard = document.createElement('header');
  newCard.classList.add('comm-main');
  newCard.innerHTML = `<div class="comm-main-top"><div class="comm-main-bg"><div class="image is-fullsize" style="background: none;"><img alt="changemyview's banner" src="/images/1002/177b6377ff41776a904cb740.jpg?size=720x240&amp;fit=cover" style="opacity: 1;"></div></div><div class="pro-pic-img is-no-hover comm-main-profile" style="background-color: rgb(116, 85, 52); background-image: url(&quot;/images/1002/177b638bfe8fd0358aa92fa6.jpg?size=200x200&amp;fit=cover&quot;);"><img alt="changemyview's profile" src="/images/1002/177b638bfe8fd0358aa92fa6.jpg?size=200x200&amp;fit=cover"></div><div class="comm-main-top-bar"></div></div><div class="comm-main-title"><h1>@headzoo</h1><div class="comm-main-description"><div class="showmorebox is-overflowing"><div class="showmorebox-body" style="max-height: 120px;"><div class="markdown-body">
<p>
7,156 points
So, I'm a little normal.
</p></div></div></div></div><div class="comm-main-created-at">Joined on 1 August 2023.</div></div>`;
  node.replaceWith(newCard);
});*/

onCreation('.post-card-card', (node) => {
  const href = node.querySelector('.post-card-link-domain')?.getAttribute('href');
  if (href && href.match(/\.(jpg|png|gif|jpeg)$/)) {
    node.classList.add('post-card-card--image');

    const imgWrap = node.querySelector('.post-card-link-image-img');
    const img = imgWrap.querySelector('img');
    if (img) {
      const src = (img.getAttribute('src') || '').split('?', 2)[0];
      if (src) {
        img.setAttribute('src', src);
        const loader = new Image();
        loader.src = src;
        loader.onload = () => {
          imgWrap.style.backgroundImage = `url(${src})`;
          const scale = loader.width / loader.height;
          console.log(scale);
          console.log(loader.width, loader.height, imgWrap.offsetWidth, imgWrap.offsetHeight);
        };

        /*setTimeout(() => {
          imgWrap.style.backgroundImage = `url(${src})`;
          console.log(imgWrap.outerHTML);
        }, 100);*/
      }
    }
  }
});

/*
const handleClick = async (e: MouseEvent) => {
  const href = e.target.getAttribute('href');
  if (href) {
    const sort = href.replace('/', '').replace('?sort=', '');
    await sendToBackground({
      name: 'sort',
      body: {
        sort
      }
    });
  }
};

setTimeout(() => {
  const items = document.querySelectorAll('.select-bar-options .select-bar-item');
  for (let i = 0; i < items.length; i++) {
    if (!items[i].classList.contains('select-bar-item--wired')) {
      document.addEventListener('click', handleClick);
      items[i].classList.add('select-bar-item--wired');
    }
  }
}, 2000);
*/
