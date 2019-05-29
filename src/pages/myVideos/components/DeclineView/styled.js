import styled from 'styled-components';

const DeclineStyled = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

DeclineStyled.Header = styled.span`
  font-size: 16px;
  font-family: 'Avenir-Bold';
`;

DeclineStyled.ReasonsWrapper = styled.ul`
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

DeclineStyled.ReasonsItem = styled.li`
  margin: 10px 0;
  display: table;
`;

DeclineStyled.TextArea = styled.textarea`
  margin: 10px 0;
  height: 100px;
  font-family: 'Avenir-light';
`;


DeclineStyled.ConfirmButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;
DeclineStyled.ConfirmButton = styled.button`
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

export default DeclineStyled;
