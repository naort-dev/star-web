import styled from 'styled-components';

const Templates = styled.div`
  height: calc(100% - 150px);
  @media (min-width: 768px) {
    padding: 0px 0px;
  }
  @media (min-width: 1025px) {
  }
`;
Templates.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
  @media (min-width: 768px) {
    margin-top: 5px;
    align-items: flex-start;
    width: 50%;
    padding-bottom: 30px;
    padding-right: 18px;
  }
  .select-material {
    width: 100%;
    text-align: center;
  }
  .input-field {
    color: #615195;
    font-size: 22px;
    font-family: Gilroy-Medium;
    text-align: center;
    padding: 6px 0 3px;
  }
  .float-label {
    width: 100%;
    text-align: center;
    color: #aaa;
    font-size: 18px;
    font-family: Gilroy;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .float-label[data-shrink='true'] {
    transform: translate(0, 1.5px) scale(0.7);
    -webkit-transform-origin: 0 0;
    width: 142.857143%;
  }
`;
Templates.Myself = styled.div`
  width: 100%;
  height: 20px;
  font-family: Gilroy;
  font-size: 14px;
  text-align: center;
  color: #2f829c;
  padding-top: 6px;
`;
Templates.Label = styled.div`
  color: #333333;
  font-family: 'Avenir-Light';
  font-size: 14px;
  display: inline-block;
  text-align: left;
  padding: 10px 0;
  @media (min-width: 768px) {
    padding-right: 10px;
    padding-bottom: 0px;
  }
  @media (min-width: 1025px) {
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
Templates.RelationLabel = styled.div`
  color: #333333;
  font-family: 'Avenir-Light';
  font-size: 14px;
  display: inline-block;
  text-align: left;
  padding: 10px 0;
  @media (min-width: 768px) {
    padding-right: 2px;
    padding-bottom: 0px;
  }
  @media (min-width: 1025px) {
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
Templates.WrapsInput = styled.div`
  width: 100%;
  position: relative;
  @media (min-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;
  }
  @media (min-width: 1025px) {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .select-label {
    /* position: absolute;
    top: 8px; */
  }
`;

Templates.Input = styled.input`
  font-family: 'Avenir-Light';
  color: #333333;
  font-size: 14px;
  text-align: left;
  outline: none;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  background-color: white;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  @media (min-width: 768px) {
    margin-top: 0;
    height: 40px;
  }
  @media (min-width: 1025px) {
    margin-top: 0;
    height: 33px;
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
    height: 40px;
  }
`;
Templates.InputArea = styled.textarea`
  font-family: 'Avenir-Light';
  color: #333333;
  font-size: 14px;
  text-align: left;
  outline: none;
  width: 100%;
  height: 108px;
  padding: 8px 8px;
  resize: none;
  border: 1px solid #d0d2d3;
  background-color: white;
  @media (min-width: 1025px) {
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
Templates.ErrorMsg = styled.div`
  color: red;
  font-size: 11px;
  margin-top: 4px;
  font-family: 'Avenir-light';
  text-align: left;
  @media (min-width: 768px) {
    width: 100%;
  }
`;
Templates.Select = styled.select`
  margin: 0;
  outline: none;
  display: inline-block;
  &::-ms-expand {
    display: none;
  }
  -ms-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  background: url('assets/images/br_down.png') no-repeat;
  background-position: 97% 8px;
  background-size: 16px;
  padding-right: 40px;
  background-color: #fff;
  font-family: 'Avenir-Light';
  color: #333333;
  font-size: 14px;
  text-align: left;
  outline: none;
  height: 34px;
  text-indent: 10px;
  background-color: white;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  @media (min-width: 768px) {
    margin-top: 0;
    height: 40px;
  }
  @media (min-width: 1025px) {
    margin-top: 0;
    height: 33px;
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
    height: 40px;
  }
`;

Templates.RecordButton = styled.button`
  width: auto;
  height: 30px;
  background-color: white;
  margin-top: 10px;
  padding: 5px 20px;
  text-align: center;
  border: 2px solid #ef6a58;
  cursor: pointer;
  background-image: url('../../assets/images/mic.svg');
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: left;
  padding-left: 35px;
  font-family: 'Avenir-Bold';
  color: #ff6c58;
  border-radius: 5px;
  min-width: 150px;
  @media (min-width: 768px) {
    margin-top: 0;
    height: 40px;
  }
  @media (min-width: 1025px) {
    margin-top: 0;
    height: 33px;
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
    height: 40px;
  }
`;

Templates.NoVideoButton = styled.button`
  margin-top: 27px;
  background-color: #fff;
  color: #ff6c58;
  padding: 4px 30px;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline: none;
  border-radius: 5px;
  border: 2px solid #ff6c58;
`;

Templates.UploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
  }
`;

Templates.UploadInput = styled.input`
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 160px;
  height: 28px;
  margin-top: 10px;
`;

Templates.Popup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

Templates.PopupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
`;

Templates.InputWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 768px) {
    align-items: flex-start;
  }
  @media (min-width: 1025px) {
    align-items: flex-end;
  }
  @media (min-width: 1920px) {
  }
`;

Templates.MicAction = styled.button`
  border: 2px solid #ff6c58;
  background-color: #fff;
  color: #ff6c58;
  height: 32px;
  padding: 5px 0px;
  border-radius: 5px;
  width: 30px;
  margin-right: 10px;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
  background-position: center;
  height: 33px;
  @media (min-width: 1920px) {
    font-size: 16px;
    height: 40px;
  }
`;

Templates.ConfirmDeleteText = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 10px 0px;
`;

Templates.ConfirmYes = styled.button`
  height: 40px;
  color: #ff6c58;
  background-color: white;
  width: 60px;
  border-radius: 5px;
  border: 2px solid #ff6c58;
  cursor: pointer;
  margin-right: 10px;
  font-family: Avenir-bold;
`;

Templates.ConfirmNo = styled.button`
  height: 40px;
  color: #ff6c58;
  background-color: white;
  width: 60px;
  border-radius: 5px;
  border: 2px solid #ff6c58;
  cursor: pointer;
  margin-left: 10px;
  font-family: Avenir-bold;
`;

Templates.ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

Templates.WrapsAudioInput = styled.div`
  width: 100%;
  display: flex;
  color: #2f839d;
  align-items: center;
  justify-content: center;
  padding-top: 19px;
  .recText {
    padding-left: 8px;
    font-family: Gilroy;
    font-size: 14px;
  }
`;

Templates.RelationshipLabelWrapper = styled.div`
  width: 69%;
`;

Templates.DetailedRelation = styled.span`
  font-size: 14px;
  display: inline-block;
  font-family: 'Avenir-Light';
  padding-bottom: 10px;
  @media (min-width: 768px) {
    padding-bottom: 0px;
  }
  @media (min-width: 1920px) {
    font-size: 14px;
  }
  @media (min-width: 1025px) {
    font-size: 13px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;

export { Templates };

export const FlexBox = styled.section`
  display: flex;
  flex-wrap: wrap;
`;
