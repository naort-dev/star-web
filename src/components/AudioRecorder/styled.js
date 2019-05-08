import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AudioRecorderDiv = styled.div`
  height: 100%;
  position: relative;
`;
AudioRecorderDiv.Icon = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 18px;
  color: #2f839d;
`;

AudioRecorderDiv.Button = styled.div`
  order: 1;
`;

AudioRecorderDiv.Rerecord = styled.div`
  width: 100px;
  height: 20px;
  font-family: Gilroy-Semibold;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.79;
  letter-spacing: normal;
  text-align: center;
  order: 1;
`;

AudioRecorderDiv.TextButton = styled.button`
  min-width: 60px;
  background-color: white;
  margin-right: 5px;
  padding: 5px 20px;
  text-align: center;
  font-family: 'Avenir-Bold';
  color: #ff6c58;
  border: 2px solid #ef6a58;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 15px;
`;

AudioRecorderDiv.Label = styled.div`
  font-size: 16px;
  color: #ff6c58;
  font-family: Avenir-bold;
  margin-bottom: 10px;
  @media (min-width: 1025px) {
    font-size: 24px;
  }
`;

AudioRecorderDiv.UploadWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
`;

AudioRecorderDiv.UploadInput = styled.input`
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

AudioRecorderDiv.CloseButton = styled.div`
  width: 100px;
  height: 20px;
  font-family: Gilroy-Semibold;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.79;
  letter-spacing: normal;
  text-align: center;
  color: #2f829c;
  order: 2;
`;

AudioRecorderDiv.Audio = styled.audio`
  @media (min-width: 1025px) {
    width: 50%;
    margin-top: 10px;
  }
`;

AudioRecorderDiv.ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  
`;

AudioRecorderDiv.PlayButton = styled.div`
  width: 100px;
  height: 20px;
  font-family: Gilroy-Semibold;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.79;
  letter-spacing: normal;
  text-align: center;
  color: #2f829c;
  order: 0;
`;

AudioRecorderDiv.PauseButton = styled.div`
  width: 100px;
  height: 20px;
  font-family: Gilroy-Semibold;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.79;
  letter-spacing: normal;
  text-align: center;
  color: #2f829c;
`;

export { AudioRecorderDiv };

export const Ripple = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: relative;
  -webkit-transition: height 0.25s ease, width 0.25s ease;
  transition: height 0.25s ease, width 0.25s ease;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  :before,
  :after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid #2f839d;
  }
  :before {
    -webkit-animation: ripple 2s linear infinite;
    animation: ripple 2s linear infinite;
  }
  :after {
    -webkit-animation: ripple 2s linear 1s infinite;
    animation: ripple 2s linear 1s infinite;
  }
  :hover:before,
  :hover:after {
    -webkit-animation: none;
    animation: none;
  }

  @-webkit-keyframes ripple {
    0% {
      -webkit-transform: scale(1);
    }
    75% {
      -webkit-transform: scale(1.75);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.75);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
