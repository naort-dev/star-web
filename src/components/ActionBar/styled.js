import styled from 'styled-components';

const ActionStyled = styled.div`
  display: block;
  position: relative;
`;

ActionStyled.List = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: solid 1px #d5d5d5;
  border-top: 0;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
  padding: 15px 16.3px;
  z-index: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .action-btn {
    width: 206px;
    min-width: 100%;
    height: 40px;
    min-height: 100%;
    font-size: 14px;
    font-family: Gilroy-Semibold;
    margin-bottom: 10px;
  }
  .action-title {
    font-family: Gilroy-Regular;
    font-size: 12px;
    color: #3c3c3c;
    text-align: center;
  }
  .rating-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    font-size: 18px;
  }
`;

ActionStyled.Dropbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16.3px;
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  background-color: ${props => (props.showList ? '#fff' : '#f7f7f7')};
  ${props => props.showList && `
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #d5d5d5;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
  .heart-icon {
    color: ${props => props.theme.orangePink};
    font-size: 20px;
  }
  .arrow-icon {
    color: #707070;
    font-size: 20px;
  }
  .placeholder {
    font-size: 12px;
    font-family: Gilroy-Regular;
    color: #3c3c3c;
  }
`;

export default ActionStyled;
