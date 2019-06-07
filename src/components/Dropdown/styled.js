import styled from 'styled-components';

const DropdownStyled = styled.div`

`;

DropdownStyled.Select = styled.div`
  position: relative;
  max-width: 100%;
  background: ${props => props.secondary ? '#fff' : props.theme.white};
  padding: 18px;
  height: 50px;
  outline: none;
  font-family: Gilroy;
  font-size: 20px;
  display: flex;
  cursor: pointer;
  align-items: center;
  ${props => props.secondary && `
    border-radius: 10px;
    border-bottom-left-radius: ${props.showList ? '0' : '10px'};
    border-bottom-right-radius: ${props.showList ? '0' : '10px'};
  `}
  @media(min-width: 1280px) {
    max-width: 640px;
    width: 100%;
  }
`;

DropdownStyled.CurrentSelected = styled.span`
  font-family: Gilroy;
  font-size: 20px;
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
  top: calc(100% + 1px);
  ${props => props.secondary && `
    top: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `}
  padding: 5px 0;
  background: ${props => props.secondary ? '#fff' : props.theme.white};
  z-index: 1;
`;

DropdownStyled.Options = styled.li`
  font-family: Gilroy;
  padding: 5px 18px
  display: block;
  text-align: left;
  display: flex;
  align-items: center;
  height: 36px;
  color: ${props => props.theme.greyishBrown};
  &:hover, &:focus {
    outline: none;
    font-family: Gilroy;
    padding: 8px 18px;
    ${props => props.secondary ? `
      color: ${props.theme.flatBlue};
    ` : `
      background: ${props.theme.veryLightPinkTwo};
    `}
  }
`;

DropdownStyled.OptionItem = styled.span`

`;

export default DropdownStyled;
