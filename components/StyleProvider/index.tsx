import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export interface Props {
  children: React.ReactNode;
}

const StyleProvider = ({ children }: Props): React.ReactElement | null => {
  const styleElement = document.createElement('style');
  const styleCache = createCache({
    key: 'plasmo-emotion-cache',
    prepend: true,
    container: styleElement
  });

  return <CacheProvider value={styleCache}>{children}</CacheProvider>;
};

export default StyleProvider;
