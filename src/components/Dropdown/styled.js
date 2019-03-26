import styled from 'styled-components';

const DropdownStyled = styled.div`

`;

DropdownStyled.Select = styled.div`
  position: relative;
  max-width: 100%;
  background: ${props => props.theme.white};
  padding: 18px;
  height: 50px;
  font-family: Gilroy-Medium;
  font-size: 20px;
  display: flex;
  cursor: pointer;
  align-items: center;
  @media(min-width: 834px) {
    width: 360px;
  }
  @media(min-width: 1280px) {
    max-width: 640px;
    width: 100%;
  }
`;

DropdownStyled.CurrentSelected = styled.span`
  font-family: Gilroy;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.9;
  text-align: left;
  width: calc(100% - 20px);
  color: ${props => props.theme.greyishBrown};
`;

DropdownStyled.DropIcon = styled.span`
  background: url('assets/images/chevron-down.png') no-repeat;
  background-size: contain;
  background-position: center center;
  width: 20px;
  height: 20px;
`;

DropdownStyled.OptionsList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 346px;
  overflow: auto;
  padding: 5px 0;
  background: ${props => props.theme.white};
  z-index: 1;
`;

DropdownStyled.OptionItem = styled.li`
  padding: 5px 18px;
  font-family: Gilroy;
  font-size: 18px;
  font-weight: 500;
  line-height: 2.11;
  text-align: left;
  color: ${props => props.theme.greyishBrown};
  &:hover, &:focus {
    outline: none;
    background: ${props => props.theme.veryLightPinkTwo};
  }
`;

export default DropdownStyled;
