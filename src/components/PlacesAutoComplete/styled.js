import styled from 'styled-components';

const PlacesStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

PlacesStyled.Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 8px 8px;
`;

PlacesStyled.ListWrapper = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 100px;
  padding: 10px 0;
  background: #fff;
  z-index: 1;
  border: 1px solid #d0d2d3;
`;

PlacesStyled.ListItem = styled.li`
  padding: 0 10px;
  margin: 10px 0;
  cursor: pointer;
  &::hover, &::focus {
    background-color: #F8F8F8;
  }
`;

export default PlacesStyled;
