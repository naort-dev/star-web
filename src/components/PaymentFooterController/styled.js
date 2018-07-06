import styled from 'styled-components';

const FooterDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center; 
  `;
FooterDiv.BookingLeft = styled.div`
  font-size:14px;
  color:#333333;
  @media(min-width: 1920px) {
    font-size: 18px;
  }
`;
FooterDiv.BookingPrice = styled.div`
  color:#333333;
  font-size:14px;
  @media(min-width: 1920px) {
    font-size: 18px;
  }
`;
FooterDiv.Button = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 41px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;

export default FooterDiv;
