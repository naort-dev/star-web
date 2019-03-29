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
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-size: cover;
  background-position: center center;
`;

AvatarStyled.AvatarBack = AvatarStyled.AvatarFace.extend`
  transform: rotateY(180deg);
  background: ${props => props.theme.flatBlue};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
`;

export default AvatarStyled;
