import styled from 'styled-components';

const SubmitStyled = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 300px;
`;

SubmitStyled.Header = styled.span`
  font-size: 16px;
  font-family: 'Avenir-Bold';
`;

SubmitStyled.ConfirmButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;

SubmitStyled.ConfirmButton = styled.button`
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

SubmitStyled.RatingTextArea = styled.textarea`
  width: 100%;
  height: 90px;
  resize: none;
  border-color: #ABABAB;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: 'Avenir-light';
`;

SubmitStyled.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Avenir-light';
  text-align:left;
  
`;

SubmitStyled.ErrorWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

export default SubmitStyled;
