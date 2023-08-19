import styled from '@emotion/styled';

export const Component = styled.ul<{ $dark: boolean }>`
  position: absolute;
  right: 58px;
  bottom: -1px;
  background-color: ${(p) => (p.$dark ? '#202020' : '#ededed')};
  width: 200px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 2;

  li {
    padding: 0.75rem 1rem;

    &:hover {
      background-color: ${(p) => (p.$dark ? '#ffffff14' : 'rgba(146,146,146,0.08)')};
    }
  }
`;
