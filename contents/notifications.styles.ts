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

export const Empty = styled.div`
  padding: 1.5rem;
  text-align: center;
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
