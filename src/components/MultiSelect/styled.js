import styled from 'styled-components';

const MultiSelectStyled = styled.div`
  .select__dropdown-indicator {
    display: none;
  }
  .select__value-container {
    padding: 0px 0px 6px;
    display: flex;
    justify-content: center;
  }
  .select__value-container > div[role='button'] {
    border: 1px solid #2f839d;
    background: #fff;
    margin: 5px 5px 5px 0;
  }
  .select__indicator-separator {
    display: none;
  }
  .category-pill {
    height: 26.7px;
    margin: 1px 5px 10px 0;
  }
`;


export { MultiSelectStyled };
