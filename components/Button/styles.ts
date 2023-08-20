import styled from '@emotion/styled';

export const Component = styled.button<{ $dark: boolean }>`
  color: inherit;
  background-color: transparent;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  outline: 0;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  transition: all 0ms;
  font-size: 14px;

  &:hover {
    color: ${(p) => (p.$dark ? '#fff' : '#333')};
    background-color: ${(p) => (p.$dark ? '#646464' : '#e5e5e5')};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${(p) => (p.$dark ? '#ffffff80' : '#a7a7a780')};
  }

  &.btn-default {
    background-color: #646464;
  }
`;
