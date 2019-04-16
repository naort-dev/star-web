import styled from 'styled-components';

export const FlexBoxSB = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FlexCenter = styled.section`
  display: flex;
  justify-content: center;
`;


export const PlayButton = styled.section`
  display: flex;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: #fff;
  align-items: center;
  svg {
    font-size: 44px;
    color: red;
  }
`;