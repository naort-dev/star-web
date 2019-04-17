import styled from 'styled-components';

const FanRegSuccessWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
`;

FanRegSuccessWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

FanRegSuccessWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:768px){
    padding: 10px 29px;
  }
`;
FanRegSuccessWrapper.HeaderText = styled.div`
  padding-top: 30px;
  font-family: Gilroy;
  font-size: 24px;
  line-height: 1.25;
  text-align: center;
  color: #ff6c58;
`;
FanRegSuccessWrapper.ButtonWrapper = styled.div`
  text-align:center;
  margin-top: 50px;
`;
FanRegSuccessWrapper.Button = styled.button`
width: 250px;
height: 60px;
border-radius: 60px;
background-color: ${props => (props.primary ? '#2f839d' : '#ff6c58')}; 
border-color: ${props => (props.primary ? '#2f839d' : '#ff6c58')}; 
border-width: 2px;
border-style: solid;
margin: 0 10px;
font-family: Gilroy-Bold;
font-size: 18px;
line-height: 1.5;
text-align: center;
color: #ffffff;
  outline:none;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: ${props => (props.primary ? '#2f839d' : '#ff6c58')}; 
    border-color: ${props => (props.primary ? '#2f839d' : '#ff6c58')}; 
  }
  @media(max-width: 832px){
    width:100%;
    margin-bottom:20px;
  }
`;
FanRegSuccessWrapper.Type = styled.div`
  padding-bottom: 20px;
`;
FanRegSuccessWrapper.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 192.8px;
`;
FanRegSuccessWrapper.Label = styled.div`
  font-family: Gilroy;
  font-size: 34px;
  font-weight: 500;
  line-height: 0.88;
  text-align: center;
  color:  #ff6c58;
  padding-top: 10px;
`;
FanRegSuccessWrapper.Description = styled.div`
  padding-top: 15px;
  font-family: Gilroy-Light;
  font-size: 18px;
  line-height: 1.44;
  text-align: center;
  color: #555555;
  width: 80%;
  margin: 0 auto;
`;


export default FanRegSuccessWrapper;
