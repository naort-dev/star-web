import styled from 'styled-components';

const BoxStyled = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 23px;
  border: 1px solid ${props => props.theme.brownGrey};
  .message-icon {
    color: ${props => props.theme.flatBlue};
    font-size: 18.8px;
  }
`;

BoxStyled.Input = styled.input`
  width: calc(100% - 26.8px);
  height: 100%;
  display: block;
  border-radius: 23px;
  border: none;
  outline: none;
  font-family: Gilroy-Regular;
  font-size: 12px;
  color: #b7b7b7;
  padding: 14.8px 19px;
`;

export default BoxStyled;
