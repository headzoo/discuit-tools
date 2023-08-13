import type { PlasmoCSConfig } from 'plasmo';
import { sendToBackground } from '@plasmohq/messaging';

export const config: PlasmoCSConfig = {
  matches: ['https://discuit.net/*']
};

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
