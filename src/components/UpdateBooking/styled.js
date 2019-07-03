import Styled from 'styled-components';

const UpdateStyled = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .heading {
    margin-bottom: 26.8px;
  }
  ${props => !props.starMode && `
    padding: 40px 30px;
  `}

  .secondary-btn {
    margin-top: 16px;
  }

  .drop-down {
    display: block;
    margin-bottom: 26.8px;
    width: 100%;
    @media(min-width: 832px) {
      width: 275px;
    }
  }

  @media(min-width: 832px) {
    ${props => props.starMode && `
      height: 100%;
    `}
  }
`;

export default UpdateStyled;
