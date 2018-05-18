import styled from 'styled-components';

const FooterDiv = styled.div`
  display:flex;
  justify-content: space-between;
`;
FooterDiv.BookingLeft = styled.div`
`;
FooterDiv.BookingPrice = styled.div`
  color:#333333;
`;
FooterDiv.Button = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
`;

export default FooterDiv;
