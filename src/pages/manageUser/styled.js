import styled from 'styled-components';

const ManageStyled = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: ${props => props.theme.white};
  @media(min-width: 832px) {
    margin-top: 244px;
    height: auto;
    min-height: calc(100vh - 244px);
  }
  @media(min-width: 1280px) {
    margin-top: 162px;
    min-height: calc(100vh - 162px);
  }
  .head1 {
    padding-top: 4px;
    padding-bottom: 32px;
    @media (min-width: 1280px) {
      padding-top: 9px !important;
      padding-bottom: 0 !important;
    }
    @media (max-width: 831px) {
      padding-bottom: 17px;
      font-size: 24px;
    }
  }
  .popstyle-wrap {
    margin-top: 8px;

    .popstyle-inner {
      padding-top: 35px;

      @media (max-width: 831px) {
        padding-top: 10px;
      }

      .sub-head {
        padding-bottom: 35px;
        font-size: 24px;
        font-family: Gilroy-Medium;
        font-weight: normal;

        @media (max-width: 831px) {
          padding-top: 0;
          padding-bottom: 25px;
        }
      }
      .row-wrap {
        padding-bottom: 14px;
      }
      .common-btn {
        margin-top: 37px;
      }

      &.password-update {
        padding-top: 35px;

        @media (max-width: 831px) {
          padding-top: 10px;
        }
  
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 25px;
          }
        }
        .inputWrapper {
          margin-bottom: 40px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        .note {
          padding-top: 7px;
        }
        .common-btn {
          margin-top: 32px;
        }
      }

      &.payment {
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 25px;
          }
        }
        .note {
          line-height: 22px;
        }
      }

      &.notification {
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 25px;
          }
        }
        .head-text {
          margin-bottom: 16px;
        }
      }
    }
  }
`;

ManageStyled.Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: 832px) {
    flex-direction: row;
    padding: 47px 10px 50px;
    max-width: 800px;
  }
  @media(min-width: 1280px) {
    max-width: 1246px;
    padding: 25px 36px 25px;
    padding-right: 10px;
    padding-left: 0;
  }
`;

ManageStyled.Visiblity = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  @media(min-width: 832px) {
    display: block;
  }
`;

ManageStyled.MobileHeading = ManageStyled.Visiblity.extend`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
  padding: 15px 0 15px;
  margin: 0 auto;
  @media(min-width: 832px) {
    display: none;
  }
`.withComponent('span');

ManageStyled.SidebarWrapper = ManageStyled.Visiblity.extend`
  @media(min-width: 832px) {
    max-width: 22%;
  }
  @media(min-width: 1280px) {
    max-width: 20%;
  }
`;

ManageStyled.RightContent = ManageStyled.Visiblity.extend`
  @media(min-width: 832px) {
    flex: auto;
    padding-left: 50px;
    width: calc(78% - 50px);
  }
`
export default ManageStyled;
