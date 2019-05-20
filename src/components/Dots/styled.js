import styled from 'styled-components';

const DotsStyled = styled.div`
  text-align: center;
`;

DotsStyled.SliderDots = styled.span`
  display: inline-block;
  margin-top: 15px;
  width: 12.6px;
  height: 12.6px;
  border: ${props => (props.selected ? '1px solid #ff6c58' : '1px solid #999999')};
  background: ${props => (props.selected ? '#ff6c58' : 'transparent')};
  border-radius: 50%;
  margin-right: 8px;
  cursor: default;
`;

export default DotsStyled;
