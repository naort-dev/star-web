import Styled from 'styled-components';

const UpdateStyled = Styled.div`

  .drop-down {
    display: block;
    margin: 26.8px;
    @media(min-width: 832px) {
      width: 275px;
    }
  }

  @media(min-width: 832px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default UpdateStyled;
