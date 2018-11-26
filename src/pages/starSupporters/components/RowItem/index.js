import React from 'react';
import RowStyled from './styled';

export default class RowItem extends React.Component {
  state = {
    showCancel: false,
  }

  render() {
    return (
      <RowStyled>
        <RowStyled.ContentWrapper>
          <RowStyled.ProfileDetailWrapper>
            <RowStyled.ProfileImageWrapper>
              <RowStyled.ProfileImage />
            </RowStyled.ProfileImageWrapper>
            <RowStyled.DetailWrapper>
              <RowStyled.StarName>Miranda</RowStyled.StarName>
              <RowStyled.DetailItem>Dec</RowStyled.DetailItem>
              <RowStyled.DetailItem>Sep</RowStyled.DetailItem>
            </RowStyled.DetailWrapper>
          </RowStyled.ProfileDetailWrapper>
        </RowStyled.ContentWrapper>
      </RowStyled>
    );
  }
}
