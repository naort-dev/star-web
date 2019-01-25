import styled from 'styled-components';

const ConfirmStyled = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

ConfirmStyled.PopupHeader = styled.span`
  font-size: 16px;
  font-family: 'Avenir-Medium';
`;

ConfirmStyled.ConfirmButtonWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  @media(min-width: 768px) {
    width: 60%;
  }

`;
ConfirmStyled.ConfirmButton = styled.button`
  background-color: ${props => (props.alternate ? '#FF6C58' : '#fff')};
  color: ${props => (props.alternate ? '#FFF' : '#FF6C58')};
  padding: 6px 18px;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline: none;
  border-radius: 5px;
  border: 2px solid ${props => (props.disabled ? '#ABABAB' : '#FF6C58')};
  &:hover {
    background-color: ${props => (props.alternate ? '#FF3B21' : '#fff')};
  }
`;

export default ConfirmStyled;
