import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const zoomIm = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

export const Component = styled.div`
  max-height: 80vh;
  max-width: 80vw;
  border: 4px solid #202020;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${zoomIm} 300ms ease-in-out;

  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;
