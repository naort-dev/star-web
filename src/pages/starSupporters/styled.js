import styled from 'styled-components';

const SupportStyled = styled.div`

`;

SupportStyled.SmallHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: Avenir-Bold;
  width: 100%;
  padding: 15px 10px 10px;
  border-bottom: 1px solid rgb(204, 204, 204);
  @media(min-width: 1025px) {
    font-size: 20px;
  }
`;

SupportStyled.Container = styled.div`
  padding: 10px;
  @media(min-width: 1025px) {
    padding-top: 50px;
  }
`;

SupportStyled.CenterSection = styled.div`
  width: 75%;
`;

SupportStyled.BigHeading = styled.span`
  font-size: 20px;
  display: block;
  font-family: Avenir-Bold;
  @media(min-width: 1025px) {
    font-size: 22px;
  }
`;

SupportStyled.Description = styled.span`
  font-size: 14px;
  font-family: Avenir-Regular;
`;

SupportStyled.ControlWrapper = styled.div`
  padding: 10px 0;
`;

SupportStyled.ControlButton = styled.button`
  background-color: #FF6C58;
  color: rgb(255,255,255);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Bold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
  &:hover {
    background-color: #FF3B21;
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
`;

export default SupportStyled;
