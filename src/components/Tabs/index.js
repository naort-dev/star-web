import React from 'react';
import TabStyled from './styled';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <TabStyled>
        <TabStyled.tabList>
          <TabStyled.tabListItem>All</TabStyled.tabListItem>
          <TabStyled.tabListItem selected>Stars</TabStyled.tabListItem>
          <TabStyled.tabListItem>Videos</TabStyled.tabListItem>
        </TabStyled.tabList>
        <TabStyled.FilterControl>
          <TabStyled.FilterLabel>Filter</TabStyled.FilterLabel>
          <TabStyled.FilterIcon />
        </TabStyled.FilterControl>
      </TabStyled>
    );
  }
}
