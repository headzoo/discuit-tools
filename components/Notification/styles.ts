import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const loading = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const Item = styled.a`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.25rem;
  position: relative;

  &:hover {
    background-color: #242424;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #ffffff80;
  }

  &.unseen {
    background-color: #ffffff14;

    &:hover {
      background-color: #ffffff1f;
    }
  }

  .loading-container {
    width: 100%;
  }

  .loading-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 1.5rem;
    flex-shrink: 0;
    background-color: #242424;
  }

  .react-loading-skeleton {
    --base-color: #ebebeb;
    --highlight-color: #f5f5f5;
    --animation-duration: 1.5s;
    --animation-direction: normal;
    --pseudo-element-display: block; /* Enable animation */

    background-color: var(--base-color);

    width: 100%;
    border-radius: 0.25rem;
    display: inline-flex;
    line-height: 1;

    position: relative;
    user-select: none;
    overflow: hidden;
    z-index: 1; /* Necessary for overflow: hidden to work correctly in Safari */
  }

  .react-loading-skeleton::after {
    content: ' ';
    display: var(--pseudo-element-display);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, var(--base-color), var(--highlight-color), var(--base-color));
    transform: translateX(-100%);

    animation-name: ${loading};
    animation-direction: var(--animation-direction);
    animation-duration: var(--animation-duration);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
`;

export const Body = styled.h3`
  font-size: 1em;
  font-weight: 500;
  margin: 0;
  --lh: 2rem;
  --max-lines: 2;
  line-height: var(--lh);
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
`;

export const Icon = styled.div`
  height: 30px;
  width: 30px;
  min-width: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1.5rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const MenuDots = styled.svg`
  width: 14px;
  height: 14px;
`;

export const Menu = styled.ul`
  position: absolute;
  right: 25px;
  bottom: -45px;
  background-color: #363636;
  width: 200px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 2;

  li {
    padding: 0.5rem;

    &:hover {
      background-color: #ffffff14;
    }
  }
`;
