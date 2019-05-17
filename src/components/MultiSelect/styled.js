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
  .select__value-container {
    justify-content: center;
    font-size: 24px;
    .select__input {
      color: #615195;
    }
  }
  .select__indicator-separator {
    display: none;
  }
  .category-pill {
    height: 26.7px;
    margin: 1px 5px 10px 0;
  }
  .select__menu {
    border-radius: 25px;
    padding: 5px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    .select__menu-list {
      border-radius: 25px;
      padding: 8px 8.9px;
    }
    &:after {
      position: absolute;
      content: '';
      top: -15px;
      left: 47%;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid #fff;
    }
  }
  .input-label {
    color: ${props => props.theme.brownGreyTwo};
    right: 0;
    text-align: center;
    font-family: Gilroy-Regular;
    font-size: 14px;
  }
  .input-label-shrink {
    right: 0;
    text-align: center;
    transform: none;
    color: ${props => props.theme.brownGreyTwo} !important;
  }
  .input-focused {
    margin-top: 32px;
  }
  .chip-delete-icon {
    font-size: 16.9px;
    color: ${props => props.theme.flatBlue};
    &:hover {
      color: ${props => props.theme.flatBlue};
    }
`;

export { MultiSelectStyled };
