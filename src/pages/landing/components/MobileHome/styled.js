import styled from 'styled-components';

const MobileStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

MobileStyled.Logo = styled.img`
  width: 196px;
  height: 50px;
`;

MobileStyled.StarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

export default MobileStyled;
