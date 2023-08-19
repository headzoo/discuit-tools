import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { sendToBackground } from '@plasmohq/messaging';

export const config: PlasmoCSConfig = {
  matches: ['https://discuit.net/*']
};

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
