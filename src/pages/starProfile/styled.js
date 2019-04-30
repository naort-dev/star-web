import styled from 'styled-components';

const StarProfileStyled = styled.div`
  margin-top: 185px;
  height: calc(100vh - 185px);
  @media(min-width: 832px) {
    margin-top: 260px;
    height: auto;
  }
  @media(min-width: 1280px) {
    margin-top: 151px;
  }
`;

StarProfileStyled.Avatar = styled.span`
  border: none;
  border-radius: 50%;
  display: block;
  width: ${props => (props.size ? `${props.size}px` : '80px')};
  height: ${props => (props.size ? `${props.size}px` : '80px')};
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.16);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
`;

export default StarProfileStyled;
