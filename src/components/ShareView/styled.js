import styled from 'styled-components';

const ShareStyled = styled.div`
  padding: 0;
  @media(min-width: 768px) {
    padding: 0 20px;
  }
`;

ShareStyled.Title = styled.span`
  display: block;
  color: #676767;
  font-size: 20px;
  font-family: 'Avenir-Bold';
  @media(min-width: 768px) {
    font-size: 25px;
  }
`;

ShareStyled.IconsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
`;

ShareStyled.Row = styled.div`
  display: flex;
  justify-content: space-between;
  &:first-child {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  &:last-child {
    margin-top: 10px;
    margin-bottom: 12px;
  }
`;

ShareStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 18px;
  text-align: center;
  cursor: pointer;
`;

ShareStyled.NetWorkButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

ShareStyled.NetworkName = styled.span`

`;

ShareStyled.Copy = styled.span`
  width: ${props => (props.size ? `${props.size}px` : '32px')};
  height: ${props => (props.size ? `${props.size}px` : '32px')};
  display: block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
  background-size: 64%;
`;

export default ShareStyled;
