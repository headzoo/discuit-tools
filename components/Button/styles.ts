import styled from '@emotion/styled';

export const Component = styled.button`
  color: inherit;
  background-color: transparent;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  outline: 0;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  transition: all 0ms;

  &:hover {
    color: #fff;
    background-color: #646464;
  }

  &:focus {
    box-shadow: 0 0 0 3px #ffffff80;
  }

  &.btn-default {
    background-color: #646464;
  }
`;
