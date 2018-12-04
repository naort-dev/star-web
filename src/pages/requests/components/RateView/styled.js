import styled from 'styled-components';

const SubmitStyled = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

SubmitStyled.Header = styled.span`
  font-size: 18px;
  font-family: 'Avenir-Bold';
`;

SubmitStyled.SubHeading = styled.span`
  font-size: 16ppx;
  color: rgba(34,34,34,0.7);
  font-family: 'Avenir-Light';
  margin: 4px 0;
`;

SubmitStyled.ProfileDetail = styled.span`
  display: block;
  text-align: center;
  font-size: 15px;
  color: rgba(34,34,34,0.7);
  font-family: 'Avenir-Light';
  margin: 4px 0;
`;

SubmitStyled.ProfileName = SubmitStyled.ProfileDetail.extend`
  font-family: 'Avenir-Medium';
  font-size: 16px;
  color: #333333;
`;

SubmitStyled.ProfileImage = styled.div`
  border-radius: 50%;
  display: block;
  background-image: ${props => (props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height: 70px;
  width: 70px;
  position: relative;
  margin: 0 auto;
`;

SubmitStyled.RatingWrapper = styled.div`
  padding: 15px 0;
  border-top: 1px solid #D8D8D8;
  border-bottom: 1px solid #D8D8D8;
  margin-top: 10px;
`;

SubmitStyled.RatingHeading = SubmitStyled.ProfileDetail.extend`
  font-family: 'Avenir-Bold';
  font-size: 17px;
  color: #333333;
`;

SubmitStyled.ReasonsWrapper = SubmitStyled.RatingWrapper.extend`
  border-top: none;
  margin-top: 0;
  text-align: center;
`;

SubmitStyled.ReasonsList = styled.ul`
  text-align: center;
  margin-top: 12px;
`;

SubmitStyled.ReasonItem = styled.li`
  display: inline-block;
  border: ${props => (props.selected ? 'none' : '1px solid #D8D8D8')};
  color: ${props => (props.selected ? '#fff' : '#333333')};
  background-color: ${props => (props.selected ? '#FF6C58' : '#fff')};
  border-radius: ${props => (props.tip ? '50%' : '7px')};
  padding: ${props => (props.tip ? '21px 22px' : '8px 10px')};
  margin: 5px;
  cursor: pointer;
  user-select: none;
`;

SubmitStyled.ConfirmButtonWrapper = styled.div`
  text-align: center;
  margin: 30px 0;
  display: flex;
  justify-content: space-around;
`;

SubmitStyled.ConfirmButton = styled.button`
  background-color: #FF6C58;
  color: rgb(255,255,255);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Bold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
  &:hover {
    background-color: #FF3B21;
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
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
  border: none;
  text-align: center;
  padding-top: 26px;
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
