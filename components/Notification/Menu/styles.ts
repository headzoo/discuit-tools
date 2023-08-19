import styled from '@emotion/styled';

export const Component = styled.ul`
  position: absolute;
  right: 58px;
  bottom: -1px;
  background-color: #363636;
  width: 200px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 2;

  li {
    padding: 0.75rem 1rem;

    &:hover {
      background-color: #ffffff14;
    }
  }
`;
