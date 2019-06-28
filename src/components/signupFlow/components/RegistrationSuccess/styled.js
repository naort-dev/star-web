import styled from 'styled-components';

const RegSuccessWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
`;

RegSuccessWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

RegSuccessWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:832px){
    padding: 0px 29px;
  }
  @media(max-width:831px){
    padding-bottom: 16px;
  }
`;
RegSuccessWrapper.HeaderText = styled.div`
  padding-top: 27px;
  font-family: Gilroy;
  font-size: 23px;
  line-height: 1.25;
  text-align: center;
  color: #ff6c58;
  @media(max-width:831px){
    padding-top: 20px;
  }
  @media(min-width:832px){
    padding-top: 33px;
  }
`;
RegSuccessWrapper.ButtonWrapper = styled.div`
text-align: center;
margin-top: 25px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
@media(min-width: 832px){
  flex-direction: row;

  &.signup-fan {
    margin-top: 50px;
  }
}
@media(max-width: 831px){
  margin-top: 0;
  padding-bottom:20px;
}
  .success-button {
    @media(max-width: 831px){
      &:not(:last-child) {
        margin-bottom:20px;
      }
    }
    @media(min-width: 832px){
      &:first-child {
        width: auto;
      }
      &:last-child {
        margin-left: 24px;
      }
    }
  }
`;

RegSuccessWrapper.Type = styled.div`
  padding-bottom: 0;
  margin-top: 15px;
  @media(min-width: 832px){
    margin-top: -7px;
  }
`;
RegSuccessWrapper.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 273px;
  margin-bottom: 0;
  @media(max-width: 831px){
    background-size: 207px auto;
    height: 210px;
  }
  &.success-fan {
    @media screen and (min-width: 832px) and (max-height: 720px) {
      height: 225px;
    }
  }
`;
RegSuccessWrapper.Label = styled.div`
  font-family: Gilroy;
  font-size: 34px;
  font-weight: 500;
  line-height: 38px;
  text-align: center;
  color:  #ff6c58;
  padding-top: 10px;
`;
RegSuccessWrapper.Description = styled.div`
  padding-top: 9px;
  font-family: Gilroy-Light;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #555555;
  width: 100%;
  margin: 0 auto;
  @media(min-width: 832px){
    max-width: 450px;
  }
  @media(max-width: 831px){
    font-size: 13px;
    line-height: 17px;
    color: #7c7c7c;
    margin: 0 auto;
    max-width: 310px;
  }
`;
RegSuccessWrapper.HighLight = styled.div`
  padding-top: 13px;
  font-family: Gilroy-SemiBold;
  font-size: 18px;
  line-height: 1.44;
  text-align: center;
  color: #555555;
  width: 80%;
  margin: 0 auto;
  @media(max-width: 831px){
    padding-top: 10px;
    color: #7c7c7c;
    width: 100%;
  }
`;

export default RegSuccessWrapper;
