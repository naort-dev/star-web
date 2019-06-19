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
  .input-underline {
    &:after {
        border-color: ${props => props.theme.flatBlue};
    }
    &:before {
      border-bottom: 2px solid rgba(0, 0, 0, 0.42) !important;
    }
    &:hover {
        &:before {
            border-bottom: 2px solid rgba(0, 0, 0, 0.42) !important;
        }
    }
}
  .select__value-container > div[role='button'] {
    border: 1px solid #2f839d;
    background: #fff;
    margin: 5px 5px 5px 0;
  }
  .select__value-container {
    justify-content: center;
    font-size: 22px;
    .fans-want &,
    .select-category & {
      padding: 7px 0px 0 !important;
      margin-bottom: 5px;
      
      @media (max-width: 831px) {
        padding: 10px 0 0 !important;
      }

      &.select__value-container--has-value .select__input {
        margin-top: 6px;
      }
    }
    .select__input {
      color: #615195;
      input {
        font-size: 24px;
        .fans-want &,
        .select-category & {
          font-size: 18px !important;
          line-height: 18px !important;
        }
      }
    }
    .select__multi-value {
      border-width: 1px;
      border-style: solid;
      border-color: rgb(47, 131, 157);
      border-image: initial;
      background: rgb(255, 255, 255);
      //height: 26.7px;
      margin: 0 5px 5px 0px;
      padding: 0px 8px 0 12px;
      border-radius: 15px;

      .fans-want &,
      .select-category & {
        margin: 12px 5px 5px 0px;
        padding: 0px 3px 0 15px;
        border-radius: 15px;
      }
    }
    .select__multi-value__label {
      padding: 0 4px 0 0;
      font-family: Gilroy-Regular;
      font-size: 14px;
      line-height: 18px
      color: ${props => props.theme.greyishBrown};
      .fans-want &,
      .select-category & {
        font-family: Gilroy-Medium;
        font-size: 14px;
        padding: 3px 5px 3px 0;
      }
    }
    .select__multi-value__remove {
      font-size: 16.9px;
      color: rgb(47, 131, 157);
      cursor: pointer;
      padding-left: 8px;
      &:hover {
        background: none;
      }
      .fans-want &,
      .select-category & {
        font-size: 16px;
        line-height: 16px;
        align-items: center;
        padding-left: 4px;
      }
    }
  }
  .select__indicator-separator {
    display: none;
  }
  .category-pill {
    // height: 26.7px;
    // margin: 1px 5px 10px 0;
    // padding: 0 12px;
    margin: 0 5px 5px 0px;
    padding: 0px 3px 0 12px;
    span {
      padding-left: 0;
      padding-right: 19px;
    }
  }
  .select__menu {
    border-radius: 25px;
    padding: 5px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    .select__menu-list {
      border-radius: 25px;
      padding: 8px 8.9px;
       & > div {
         height: auto;
         line-height: 16px !important;
       }
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
  .select__indicators {
    display: none;
  }
  .input-focused {
    margin-top: 32px;
  }
  .chip-delete-icon {
    font-size: 16.9px;
    width: 20px;
    height: 20px;
    color: ${props => props.theme.flatBlue};
    &:hover {
      color: ${props => props.theme.flatBlue};
    }
`;

export { MultiSelectStyled };
