import styled from '@emotion/styled';

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
