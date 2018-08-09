import styled from 'styled-components';

const RatingStyled = styled.div`
display: flex;
justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;

RatingStyled.Rating = styled.label`
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 1.5em;
  color: ${props => (props.selected ? '#FF6C58' : '#ABABAB')};
  transition: color .2s ease-out;
  &:hover {
    cursor: pointer;
  }

  &.is-disabled:hover {
    cursor: default;
  }
`;

export default RatingStyled;
