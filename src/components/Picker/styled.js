import styled from 'styled-components';

const PickerStyled = styled.div`
  display: inline-block;
`;

PickerStyled.Selected = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
`;

PickerStyled.Arrow = styled.span`
  margin-left: 10px;
`;

export default PickerStyled;
