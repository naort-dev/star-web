import React from 'react';
import PathDrawer from './components/PathDrawer';
import DesktopStyled from './styled';

const AvatarContent = () => {
  return (
    <DesktopStyled.AvatarContent>
      <DesktopStyled.AvatarFront />
      <DesktopStyled.AvatarBack>
        Name and details
      </DesktopStyled.AvatarBack>
    </DesktopStyled.AvatarContent>
  );
};

const DesktopHome = (props) => {
  return (
    <DesktopStyled>
      <DesktopStyled.Logo src="assets/images/logo_starsona.png" />
      <DesktopStyled.Heading>
       Personalized Videos From The Stars
      </DesktopStyled.Heading>
      <DesktopStyled.FlowWrapper>
        <DesktopStyled.StarSection>
          <DesktopStyled.SubHeader>
            Book a shoutout!
          </DesktopStyled.SubHeader>
          <DesktopStyled.StarContent>
            <DesktopStyled.Divider>
              <DesktopStyled.FilterSection>

              </DesktopStyled.FilterSection>
              <DesktopStyled.ColumnDivider>
                <DesktopStyled.RowDivider>
                  <DesktopStyled.Avatar>
                    { AvatarContent() }
                  </DesktopStyled.Avatar>
                  <DesktopStyled.Avatar>
                    { AvatarContent() }
                  </DesktopStyled.Avatar>
                </DesktopStyled.RowDivider>
                <DesktopStyled.BigAvatar>
                  { AvatarContent() }
                </DesktopStyled.BigAvatar>
              </DesktopStyled.ColumnDivider>
            </DesktopStyled.Divider>
            <DesktopStyled.SecondaryDivider>
              <DesktopStyled.SecondaryAvatar>
                { AvatarContent() }
              </DesktopStyled.SecondaryAvatar>
              <DesktopStyled.ColumnDivider>
                <DesktopStyled.Avatar>
                  { AvatarContent() }
                </DesktopStyled.Avatar>
                <DesktopStyled.Avatar>
                  { AvatarContent() }
                </DesktopStyled.Avatar>
              </DesktopStyled.ColumnDivider>
            </DesktopStyled.SecondaryDivider>
            <DesktopStyled.SecondaryDivider>
              <DesktopStyled.RowDivider>
                <DesktopStyled.Avatar>
                  { AvatarContent() }
                </DesktopStyled.Avatar>
                <DesktopStyled.Avatar>
                  { AvatarContent() }
                </DesktopStyled.Avatar>
                <DesktopStyled.Avatar>
                  { AvatarContent() }
                </DesktopStyled.Avatar>
              </DesktopStyled.RowDivider>
            </DesktopStyled.SecondaryDivider>
          </DesktopStyled.StarContent>
        </DesktopStyled.StarSection>
        <DesktopStyled.ProcessSection>
          <DesktopStyled.SubHeader>
            Make your  request
          </DesktopStyled.SubHeader>
          <DesktopStyled.ColumnDivider className="main-column">
            <DesktopStyled.RowDivider>
              <DesktopStyled.Avatar />
              <DesktopStyled.ColumnDivider>
                <DesktopStyled.Title>Shout-Outs</DesktopStyled.Title>
                <p>
                  Birthdays, words of encouragement, or to make fun
                  of your buddy who lost in fantasy football. It’s your choice!
                </p>
              </DesktopStyled.ColumnDivider>
            </DesktopStyled.RowDivider>
            <DesktopStyled.RowDivider>
              <DesktopStyled.Avatar />
              <DesktopStyled.ColumnDivider>
                <DesktopStyled.Title>Announcements</DesktopStyled.Title>
                <p>
                  Birthdays, words of encouragement, or to make fun
                  of your buddy who lost in fantasy football. It’s your choice!
                </p>
              </DesktopStyled.ColumnDivider>
            </DesktopStyled.RowDivider>
            <DesktopStyled.RowDivider>
              <DesktopStyled.Avatar />
              <DesktopStyled.ColumnDivider>
                <DesktopStyled.Title>Ask A Question</DesktopStyled.Title>
                <p>
                  Birthdays, words of encouragement, or to make fun
                  of your buddy who lost in fantasy football. It’s your choice!
                </p>
              </DesktopStyled.ColumnDivider>
            </DesktopStyled.RowDivider>
          </DesktopStyled.ColumnDivider>
        </DesktopStyled.ProcessSection>
        <PathDrawer />
      </DesktopStyled.FlowWrapper>
    </DesktopStyled>
  );
};

export default DesktopHome;
