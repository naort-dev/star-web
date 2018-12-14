import styled from 'styled-components';

const SubmitStyled = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

SubmitStyled.BackButton = styled.span`
  position: absolute;
  top: 2px;
  left: 5px;
  background-image: url(assets/images/icon_back_40a.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 15px;
  background-size: 26px;
  background-color: white;
  cursor: pointer;
  outline: none;
`;

SubmitStyled.Header = styled.span`
  font-size: 18px;
  font-family: 'Avenir-Bold';
`;

SubmitStyled.SubHeading = styled.span`
  font-size: 16px;
  color: rgba(34,34,34,0.7);
  font-family: 'Avenir-Light';
  margin: 4px 0;
`;

SubmitStyled.SubText = styled.span`
  display: inline-block;
  font-size: 14px;
  color: #333333;
  user-select: none;
  font-family: 'Avenir-Regular';
  cursor: pointer;
  &::before {
    content: '';
    background: url('assets/images/media.png') no-repeat;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size: contain;
    margin-right: 5px;
    vertical-align: middle;
    margin-bottom: 4px;
  }
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
  text-align: center;
`;

SubmitStyled.RatingHeading = SubmitStyled.ProfileDetail.extend`
  font-family: 'Avenir-Bold';
  font-size: 17px;
  color: #333333;
`;

SubmitStyled.ReasonsWrapper = SubmitStyled.RatingWrapper.extend`
  border-top: none;
  margin-top: 0;
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
  border-radius: 7px;
  padding: 8px 10px;
  margin: 5px;
  cursor: pointer;
  user-select: none;
`;

SubmitStyled.TipsList = SubmitStyled.ReasonsList.extend`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

SubmitStyled.TipItem = SubmitStyled.ReasonItem.extend`
  border-radius: 50%;
  padding: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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

SubmitStyled.ColorText = styled.span`
  color: #FF6C58;
  font-size: 16px;
  font-family: 'Avenir-Regular';
  cursor: pointer;
`;

SubmitStyled.CustomInput = styled.input`
  font-family: 'Avenir-Regular';
  color: #333333;
  font-size: 14px;
  text-align:left;
  outline:none;
  width: 140px;
  height: 40px;
  margin: 4px 5px;
  padding: 8px 8px;
  resize: none;
  background-color: white;
  border: 1px solid #EBEBEB;
  border-color: #EBEBEB;
  border-radius: 4px;
  &:focus {
    border-color: #FF6C58;
  }
  @media(min-width:768px){
    margin-top:0;
  }
  @media(min-width:1025px){
    margin-top:0;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

SubmitStyled.CloseButton = styled.span`
  width: 20px;
  height: 20px;
  display: block;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
  background-size: contain;
  cursor: pointer;
`;

SubmitStyled.RatingTextArea = styled.textarea`
  width: 100%;
  height: 90px;
  resize: none;
  outline: none;
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
  font-size: 13px;
  margin-top: 4px;
  font-family: 'Avenir-light';  
`;

SubmitStyled.ErrorWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

SubmitStyled.FilesList = styled.ul`
  text-align: center;
  margin: 15px 0;
`;

SubmitStyled.FileItem = styled.li`
  margin: 0 12px;
  display: inline-block;
  position: relative;
  ${SubmitStyled.CloseButton} {
    position: absolute;
    top: -13px;
    right: -20px;
  }
`;

SubmitStyled.ImageFile = styled.img`
  width: 50px;
  height: 50px;
  display: block;
`;

SubmitStyled.VideoFile = styled.video`
  width: 50px;
  height: 50px;
  display: block;
  object-fit: fill;
`;

export default SubmitStyled;
