import styled from 'styled-components';

const ReactionStyled = styled.div`

`;

ReactionStyled.BackButton = styled.span`
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

ReactionStyled.Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'Avenir-Medium';
  margin-bottom: 10px;
`;

ReactionStyled.OrderDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #D8D8D8;
`;

ReactionStyled.ProfileImage = styled.span`
  border-radius: 50%;
  display: block;
  background-image: ${props => (props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:50px;
  width:50px;
  position: relative;
`;

ReactionStyled.BookingTitle = styled.span`
  margin-top: 10px;
  &::after {
    content: '';
    background: #333333;
    display: block;
    width: 50px;
    height: 1px;
    margin: 0 auto;
    margin-top: 20px;
  }
`;

ReactionStyled.DateDetails = styled.span`
  margin-top: 20px;
  font-size: 12px;
`;

ReactionStyled.MediaWrapper = styled.div`
  height: 200px;
  margin-bottom: 36px;
  .image-gallery-slide img {
    width: auto;
    margin: 0 auto;
    height: 200px;
    display: block;
  }
  .image-gallery-left-nav, .image-gallery-right-nav {
    top: calc(50% - 20px);
  }
  .image-gallery-bullets .image-gallery-bullets-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -48px;
  }
  .image-gallery-bullets .image-gallery-bullet {
    box-shadow: none;
    background: #D8D8D8;
  }
  .image-gallery-bullets .image-gallery-bullet.active {
    background: #FF6C58;
  }
`;

ReactionStyled.RowItem = styled.span`
  padding: 10px;
  border-bottom: 1px solid #D8D8D8;
  display: block;
  font-family: 'Avenir-Regular';
`;

ReactionStyled.RowItemHeader = styled.span`
  display: block;
  font-family: 'Avenir-Light';
  margin-bottom: 10px;
  font-size: 12px;
`;

ReactionStyled.ReasonItem = styled.span`
  display: inline-block;
  border: 1px solid #D8D8D8;
  color: #333333;
  background-color: #fff;
  border-radius: 7px;
  padding: 8px 10px;
  user-select: none;
`;

export default ReactionStyled;
