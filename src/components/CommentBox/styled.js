import styled from 'styled-components';

const BoxStyled = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 23px;
  border: 1px solid ${props => props.theme.brownGrey};
  .message-icon {
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    font-size: 18.8px;
  }
`;

BoxStyled.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

BoxStyled.Reminder = styled.span`
  color:  #555;
  font-size: 12px;
  height: 15px;
  font-family: Gilroy-Bold;
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
