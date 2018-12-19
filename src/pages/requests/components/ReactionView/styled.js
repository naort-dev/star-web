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
`;

export default ReactionStyled;
