import type { PlasmoCSConfig } from 'plasmo';
import { onCreation } from '~utils/NodeCreationObserver';
import { calculateNewDimensions } from '~utils';
import styleText from 'data-text:./images.scss';

export const config: PlasmoCSConfig = {
  matches: ['https://discuit.net/*']
};

const head = document.querySelector('head');
if (head) {
  const style = document.createElement('style');
  style.textContent = styleText;
  head.appendChild(style);
}

/**
 * Creates inline images when a post has an image.
 */
onCreation('.post-card-card', (node) => {
  const href = node.querySelector('.post-card-link-domain')?.getAttribute('href');
  if (href && href.match(/\.(jpg|png|gif|jpeg)$/)) {
    node.classList.add('post-card-card--image');

    const imgWrap = node.querySelector('.post-card-link-image-img') as HTMLElement;
    const img = imgWrap.querySelector('img') as HTMLElement;
    if (img && imgWrap) {
      const loader = new Image();
      loader.onload = () => {
        imgWrap.style.backgroundImage = `url(${href})`;

        if (loader.width < imgWrap.offsetWidth) {
          img.style.width = `${loader.width}px`;
          img.style.height = `${loader.height}px`;
          imgWrap.style.height = `${loader.height + 2}px`;
          imgWrap.style.width = `${loader.width + 2}px`;
        } else {
          const { height, width } = calculateNewDimensions(loader.width, loader.height, imgWrap.offsetWidth);
          imgWrap.style.height = `${height}px`;
          imgWrap.style.width = `${width}px`;

          if (height > 600) {
            const viewMore = document.createElement('div');
            viewMore.classList.add('post-card-link-image-view-more');
            viewMore.innerHTML = 'View';
            imgWrap.appendChild(viewMore);
          }
        }
      };
      loader.src = href;
      img.setAttribute('src', href);
    }
  }
});
