import styled from '@emotion/styled';

export const Component = styled.ul<{ $dark: boolean }>`
  position: absolute;
  right: 58px;
  bottom: -1px;
  background-color: ${(p) => (p.$dark ? '#383838' : '#dddddd')};
  width: 200px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 2;

  li {
    padding: 0.75rem 1rem;

    &:hover {
      background-color: ${(p) => (p.$dark ? '#ffffff14' : '#cdcdcd')};
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 3px ${(p) => (p.$dark ? '#ffffff80' : '#a7a7a780')};
    }
  }
`;
