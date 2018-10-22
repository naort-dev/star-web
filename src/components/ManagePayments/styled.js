import styled from 'styled-components';

const ManagePaymentsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

ManagePaymentsStyled.cardListWrapper = styled.ul`
  margin-bottom: 10px;
`;

ManagePaymentsStyled.cardListItem = styled.li`
  margin-bottom: 10px;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
`;

ManagePaymentsStyled.cardItemDetails = styled.span`
  background-color: ${props => (props.selected ? '#FF6C58' : 'rgb(248,248,248)')};
  border-radius: 12px;
  padding: 10px;
  color: ${props => (props.selected ? '#fff' : '#333333')};
  width: 100%;
  display: block;
`;

ManagePaymentsStyled.CardNumber = styled.span`
  margin-left: 10px;
  display: inline-block;
  margin-top: 8px;
  vertical-align: top;
`;

ManagePaymentsStyled.removeCardListItem = styled.span`
  position:absolute;
  right: 10px;
  top: 19px;
  width: 15px;
  height: 15px;
  display: block;
  background: ${props => (props.selected ? 'url(assets/images/close-icon-white.svg)' : 'url(assets/images/close-icon-orange.svg)')};
  background-repeat: no-repeat;
`;

ManagePaymentsStyled.CardTypeIcon = styled.span`
  width: 42.6px;
  height: 26.6px;
  background: ${props => (props.cardImage ? `url(${props.cardImage})` : 'url(assets/images/card-icons/default-icon.svg)')} no-repeat;
  background-size: 100% 100%;
  display: inline-block;
`;

ManagePaymentsStyled.ButtonWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
`;

ManagePaymentsStyled.AddCard = styled.button`
  background-color: #fff;
  color: #FF6C58;
  padding: 6px 18px;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
`;

export default ManagePaymentsStyled;
