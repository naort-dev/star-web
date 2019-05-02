import styled from 'styled-components';

const DotsStyled = styled.div`
  text-align: center;
`;

DotsStyled.SliderDots = styled.span`
  display: inline-block;
  margin-top: 15px;
  width: 12.5px;
  height: 12.5px;
  border: 1px solid #ff6c58;
  background: ${props => (props.selected ? '#ff6c58' : 'transparent')};
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
`;

export default DotsStyled;
