import styled from 'styled-components';

const AlertStyled = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

AlertStyled.Header = styled.span`
  font-size: 16px;
  font-family: 'Avenir-Bold';
`;

AlertStyled.ReasonsWrapper = styled.ul`
  line-height: 24px;
  margin-top: 10px;
  input {
    margin-right: 10px;
    display: table-cell;
  }
  span {
    display: table-cell;
  }
`;

AlertStyled.ConfirmButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;
AlertStyled.ConfirmButton = styled.button`
  background-color: #fff;
  color: ${props => (props.disabled ? '#ABABAB' : '#FF6C58')};
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
`;

export default AlertStyled;
