import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 46px;
  left: -180px;
  z-index: 1000;
  width: 400px;
  // height: 400px;
  padding: 1.5rem;
  background-color: #202020;
  border-radius: 5px;
  border: 1px solid #ffffff14;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;

export const Inner = styled.div`
  margin: 1rem 0;
  padding: 0;
  list-style: none;
`;

export const Item = styled.a`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #ffffff14;
  }

  &.unseen {
    background-color: #ffffff14;
  }
`;

export const Icon = styled.div`
  height: 30px;
  width: 30px;
  min-width: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

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
  text-transform: uppercase;

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
