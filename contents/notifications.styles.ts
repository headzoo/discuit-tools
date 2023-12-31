import styled from '@emotion/styled';

interface ContainerProps {
  $open: boolean;
  $dark: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 46px;
  left: -180px;
  z-index: 1000;
  width: 400px;
  border-radius: 5px;
  font-size: 14px;
  color: ${(p) => (p.$dark ? '#FFF' : '#323232')};
  background-color: ${(p) => (p.$dark ? '#202020' : '#FFFFFF')};
  border: 1px solid ${(p) => (p.$dark ? '#ffffff14' : '#d9d9d9')};
  display: ${(p) => (p.$open ? 'flex' : 'none')};
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  font-weight: 400;

  .dt-scrollbars {
    transition: height 5s ease;
  }
`;

export const Inner = styled.div`
  margin: 0;
  list-style: none;
  padding: 4px;
`;

export const Empty = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const Header = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem;
  border-bottom: 1px solid ${(p) => (p.$dark ? '#ffffff14' : '#d9d9d9')};

  span {
    margin-right: 2rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &:last-of-type {
      margin-right: 0;
    }

    &.dt-close {
      top: 2px;
      position: relative;
    }
  }

  svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
  }
`;

export const Footer = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  padding: 1.5rem;
  border-top: 1px solid ${(p) => (p.$dark ? '#ffffff14' : '#d9d9d9')};
  background-color: ${(p) => (p.$dark ? '#242424' : '#ededed')};

  a {
    color: ${(p) => (p.$dark ? '#ffffff' : '#343434')};
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      text-decoration: underline;
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 3px ${(p) => (p.$dark ? '#ffffff80' : '#a7a7a780')};
    }
  }
`;
