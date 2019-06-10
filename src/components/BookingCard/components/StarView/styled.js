import styled from 'styled-components';

const StarViewStyled = styled.div`

`;

StarViewStyled.HeaderText = styled.h5`
  font-family: Gilroy-Regular;
  font-size: 24px;
  color: ${props => props.theme.orangePink};
  padding-right: 24px;
  text-align: center;
  strong {
    font-family: Gilroy-Medium;
  }
`;

StarViewStyled.VideoWrapper = styled.div`
  width: 195.7px;
  height: 301.9px;
  .video-container {
    box-shadow: none;
  }
`;

StarViewStyled.DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    display: block;
  }
  .action-btn {
    min-width: auto;
    min-height: auto;
    font-size: 14px;
    width: 130px;
    height: 40px;
  }
`;

export default StarViewStyled;
