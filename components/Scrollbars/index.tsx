import React from 'react';

// @see https://github.com/malte-wessel/react-custom-scrollbars

const offset = 4;
const width = 8;
const height = 8;
const borderRadius = 4;
const opacity = 0.25;
const backgroundColor = '#d5d5d5';

/**
 * Renders the horizontal scrollbar.
 */
export const renderTrackHorizontal = ({ style, ...props }) => {
  const finalStyle = {
    ...style,
    right: offset,
    bottom: offset,
    left: offset,
    height,
    opacity,
    borderRadius,
  };
  return <div style={finalStyle} {...props} />;
};

/**
 * Renders the vertical scrollbar.
 */
export const renderTrackVertical = ({ style, ...props }) => {
  const finalStyle = {
    ...style,
    right: offset,
    bottom: offset,
    top: offset,
    width,
    opacity,
    borderRadius,
  };
  return <div style={finalStyle} {...props} />;
};

/**
 * Renders the horizontal thumb.
 */
export const renderThumbHorizontal = ({ style, ...props }) => {
  const finalStyle = {
    ...style,
    cursor: 'pointer',
    borderRadius: 'inherit',
  };
  return <div style={finalStyle} {...props} />;
};

/**
 * Renders the vertical thumb.
 */
export const renderThumbVertical = ({ style, ...props }) => {
  const finalStyle = {
    ...style,
    cursor: 'pointer',
    borderRadius: 'inherit',
    backgroundColor,
  };
  return <div style={finalStyle} {...props} />;
};
