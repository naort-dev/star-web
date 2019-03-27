import styled from 'styled-components';


const AvatarStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  &:hover {
    transform: rotateY(180deg);
  }
`;

AvatarStyled.AvatarFace = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border-radius: 50%;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  backface-visibility: hidden;
`;

AvatarStyled.AvatarFront = AvatarStyled.AvatarFace.extend`
  background: url('assets/images/default-cover.jpg') no-repeat;
  background-position: center center;
  background-size: contain;
`;

AvatarStyled.AvatarBack = AvatarStyled.AvatarFace.extend`
  transform: rotateY(180deg);
  background: ${props => props.theme.flatBlue};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: Gilroy;
  font-size: 30px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.07;
  letter-spacing: normal;
`;

export default AvatarStyled;