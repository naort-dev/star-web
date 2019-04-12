import styled from 'styled-components';

const DotsStyled = styled.div`
  text-align: center;
`;

DotsStyled.SliderDots = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid #ff6c58;
  background: ${props => (props.selected ? '#ff6c58' : 'transparent')};
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
`;

export default DotsStyled;
