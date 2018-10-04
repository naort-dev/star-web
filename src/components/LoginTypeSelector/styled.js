import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const TypeSelectorWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
`;
TypeSelectorWrapper.Content = styled.div`
  padding: 0px 0px;
`;

TypeSelectorWrapper.heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 25px;
  color:#FF6C58;
  @media(min-width:1920px){
    font-size:32px;
  }
`;
TypeSelectorWrapper.subheading = styled.div`
  font-family: 'Ubuntu-Light';
  font-size: 12px;
  color:#333333;
  @media(min-width : 768px){
    font-size: 16px;
  }
  @media(min-width: 1025px){
    font-size: 16px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;
TypeSelectorWrapper.LoginDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #007FAA;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
  @media(min-width:1920px){
    font-size:16px;
  }
`;
TypeSelectorWrapper.SocialMediaMessage = styled.div`
  font-family: 'Ubuntu-Medium';
  font-size: 14px;
  text-align: center;
  color: #333333;
  margin-top: 5px;
  margin-bottom:5%;
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:14px;
  }
  @media(min-width:1920px){
    font-size:18px;
  }
`;
TypeSelectorWrapper.Button = styled.button`
  padding: 10px 10px;
  outline:none;
  border: 2px solid rgba(51, 51, 51, 1); 
  background-color: white;
  border-radius: 13px;
  margin-top: 6%;
  font-family: 'Ubuntu-Medium';
  font-size:13px;
  color: #333333;
  width: 100%;
  text-align:center;
  cursor: pointer;
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.12);
  
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width : 768px){
    font-size:22px;
    width: 490px;
  }
  @media(min-width: 1025px){
    font-size: 22px;
    width: 300px;
  }
  @media(min-width:1920px){
    width:480px;
    height:80px;
    font-size:28px;
  }
`;


TypeSelectorWrapper.ComponentWrapper = styled.div`
  height: 100%;
  @media(min-width:1025px){
    height:calc(100% - 40px);
  }
`;

TypeSelectorWrapper.ComponentWrapperScroll = styled(Scrollbars)`
  .component-wrapper-scroll-wrapper {

  }
`;
TypeSelectorWrapper.ContinueButton = styled.button`
  background-color: #e44740;
  color: rgb(255, 255, 255);
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  font-family: Ubuntu-Medium;
  cursor: pointer;
  padding: 12px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #e44740;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
  a{
    color: #FF6C58;
  }
`;
TypeSelectorWrapper.DisableButton = styled.button`
  background-color: #b6b6b6;
  color: #676767;
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  font-family: Ubuntu-Medium;
  cursor: pointer;
  padding: 12px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #b6b6b6;
  border-image: initial;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
  a{
    color: #FF6C58;
  }
`;
TypeSelectorWrapper.PaymentControllerWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  text-align:center;
  padding: 7px 16px;
  background-color: #fff;
  z-index: 5;
  @media(min-width: 768px) {
    position: absolute;
    padding: 13px;
  }
  @media(min-width:1025px){
    margin: 0 42px;
    box-shadow: none;
    left:0;
    right:0;
  }
`;
TypeSelectorWrapper.OptionWrapper = styled.footer`
  padding-bottom: 28px;
  @media(min-width:768px){
    padding: 10px 29px;
  }
`;
TypeSelectorWrapper.HeaderText = styled.div`
  text-align:center;
  color:#676767;
  font-size:20px;
  font-family: 'Ubuntu-Bold';
  @media(min-width:768px){
    font-size:32px;
  }
  @media(min-width:1025px){
    font-size:38px;
  }
`;
TypeSelectorWrapper.ButtonWrapper = styled.div`
  text-align:center;
`;
TypeSelectorWrapper.Button = styled.button`
  width:100%;
  max-width:364px;
  height:56px;
  background-color:white;
  color:rgba(51, 51, 51, 1);
  border: 3px solid rgba(51, 51, 51, 0.72); 
  border-radius:19px;
  font-size:16px;
  font-family: 'Ubuntu-Medium';
  box-shadow: -2px 6px 8px rgba(0, 0, 0, 0.12);
  margin-bottom:25px;
  outline:none;
  cursor: pointer;
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width: 768px){
    max-width:500px;
    height:80px;
    font-size:28px;
    margin-bottom:40px;
  }
  @media(min-width: 1025px){
    max-width:325px;
    height:53px;
    font-size:20px;
  }
  @media(min-width:1920px){
    max-width: 475px;
  }
`;
TypeSelectorWrapper.UL = styled.ul`
  color: #AAAAAA;
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #333;
`;
TypeSelectorWrapper.LI = styled.li`
  color: #AAAAAA;
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #333;
`;


export default TypeSelectorWrapper;
