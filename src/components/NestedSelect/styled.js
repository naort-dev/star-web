import styled from 'styled-components';

const NestedSelectStyled = styled.div`
  .input-label {
    text-align: center;
    font-family: Gilroy-Regular;
    font-size: 18px;
    color: ${props => props.theme.brownGreyTwo};
  }
  .input-label-shrink {
    right: 0;
    text-align: center;
    transform: none;
    color: ${props => props.theme.brownGreyTwo} !important;
  }
  .select__menu {
    margin-top: 0;
    .select__menu-list, .select__group {
      padding-top: 0;
    }
  }
  .select__value-container {
    justify-content: center;
    font-size: 24px;
    padding: 10px 0px 10px !important;
    .select__input {
      color: #615195;
      padding: 10px 0;
    }
  }
  .select__group {
    padding-bottom: 0;
    .select__group-heading {
      font-family: Gilroy-Medium;
      display: block;
      font-size: 18px;
      background: ${props => props.theme.white};
      color: ${props => props.theme.greyishBrown};
      padding: 10px 17px;
      margin-bottom: 0;
    }
    input {
      display: none;
      &:checked + div .select-option-item {
        display: none;
      }
    }
    .select-option-item {
      color: ${props => props.theme.flatBlue};
      padding-left: 34px;
      padding-bottom: 2px;
      background-color: #fff !important;
    }
  }
  .select__dropdown-indicator {
    display: none;
  }
  .select__value-container {
    //border-bottom: 1px solid #aaa;
  }
  .select__value-container > div[role='button'] {
    border: 1px solid #2f839d;
    background: #fff;
    margin: 5px 5px 5px 0;
  }
  .select__indicator-separator {
    display: none;
  }
  .chip-delete-icon {
    font-size: 16.9px;
    color: ${props => props.theme.flatBlue};
    &:hover {
      color: ${props => props.theme.flatBlue};
    }
  }
`;

export { NestedSelectStyled };
