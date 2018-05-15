import React from 'react';
import { SidebarStyled } from './styled';
import { Footer } from '../Footer';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  render() {
    console.log(this.state.name);
    return (
      <SidebarStyled>
        <SidebarStyled.FilterWrapper>
          <SidebarStyled.Filter>
            <SidebarStyled.SectionHeading>Find a Star </SidebarStyled.SectionHeading>
            <SidebarStyled.Separator />
            <SidebarStyled.ListWrapper>
              <SidebarStyled.ListItem>Featured</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Sports</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Music</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Movies / TV</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Radio / Podcasts</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Social / Youtube</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Comedians</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Everyday Stars</SidebarStyled.ListItem>
              <SidebarStyled.ListItem>Impersonators</SidebarStyled.ListItem>
            </SidebarStyled.ListWrapper>
          </SidebarStyled.Filter>
        </SidebarStyled.FilterWrapper>
        <Footer />
      </SidebarStyled>
    );
  }
}
