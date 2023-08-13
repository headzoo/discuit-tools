import styled from '@emotion/styled';

interface ContainerProps {
  $open: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 46px;
  left: -180px;
  z-index: 1000;
  width: 400px;
  background-color: #202020;
  border-radius: 5px;
  border: 1px solid #ffffff14;
  font-size: 14px;
  display: ${(p) => (p.$open ? 'flex' : 'none')};
  flex-direction: column;

  .dt-scrollbars {
    transition: height 5s ease;
  }
`;

export const Inner = styled.div`
  margin: 0;
  list-style: none;
  padding: 4px;
`;

export const Item = styled.a`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.25rem;

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
`;

export const Body = styled.h3`
  font-size: 1em;
  font-weight: 500;
  margin: 0;

  .title {
    display: inline;
  }

  .username {
    display: inline;
  }
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

export const Empty = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  padding: 1.5rem;
  background-color: #242424;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem;

  span {
    margin-right: 2rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
