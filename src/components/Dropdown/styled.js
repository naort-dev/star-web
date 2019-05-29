import styled from 'styled-components';

const DropdownStyled = styled.div`

`;

DropdownStyled.Select = styled.div`
  position: relative;
  max-width: 100%;
  background: ${props => props.theme.white};
  outline: none;
  font-family: Gilroy;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  @media(min-width: 1280px) {
    max-width: 640px;
    width: 100%;
  }
`;

DropdownStyled.LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 6px 18px;
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
  height: 346px;
  overflow: auto;
  width: 100%;
  padding: 5px 0;
  background: ${props => props.theme.white};
  z-index: 1;
  border-top: 1px solid #fff;
`;

DropdownStyled.Options = styled.li`
  font-family: Gilroy;
`;

DropdownStyled.OptionItem = styled.span`
  padding: 5px 18px
  line-height: 2.11;
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
    background: ${props => props.theme.veryLightPinkTwo};
  }
`;

export default DropdownStyled;
