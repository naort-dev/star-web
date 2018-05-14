import React from 'react';
import { SectionHeading, SidebarWrapper, ListWrapper, ListItem } from './styled';

export default class Sidebar extends React.Component {
  render() {
    return (
      <SidebarWrapper>
        <SectionHeading>Find a Star </SectionHeading>
		<ListWrapper>
			<ListItem>Featured</ListItem>
			<ListItem>Sports</ListItem>
			<ListItem>Music</ListItem>
			<ListItem>Movies / TV</ListItem>
			<ListItem>Radio / Podcasts</ListItem>
			<ListItem>Social / Youtube</ListItem>
			<ListItem>Comedians</ListItem>
			<ListItem>Everyday Stars</ListItem>
			<ListItem>Impersonators</ListItem>
		</ListWrapper>
      </SidebarWrapper>
    );
  }
}
