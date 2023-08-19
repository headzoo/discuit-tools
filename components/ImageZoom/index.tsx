import React, { useEffect, useState } from 'react';
import { scaleImage } from '~utils';
import { Component } from './styles';

export interface Props {
  src: string;
  onClose: () => void;
}

const ImageZoom = ({ src, onClose }: Props): React.ReactElement | null => {
  const [isLoaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  /**
   * Load the image and get the dimensions.
   */
  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoaded(true);

        const maxWidth = 1200;
        const maxHeight = 800;
        const { width, height } = scaleImage({ width: img.width, height: img.height, maxWidth, maxHeight });
        setWidth(width);
        setHeight(height);
      };

      const handleDocumentClick = (e: MouseEvent) => {
        setLoaded(false);
        onClose();
      };
      document.addEventListener('click', handleDocumentClick);

      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  }, [src]);

  return (
    <Component style={{ width, height }}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        {isLoaded && <img src={src} alt="" />}
      </a>
    </Component>
  );
};

export default ImageZoom;
