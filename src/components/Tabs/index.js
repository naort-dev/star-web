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
          {
            this.props.labels.map((item, index) => (
              <TabStyled.tabListItem key={index} selected={this.props.selected === item}>{item}</TabStyled.tabListItem>
            ))
          }
        </TabStyled.tabList>
        {
          !this.props.disableFilter &&
          <TabStyled.FilterControl>
            <TabStyled.FilterLabel>Filter</TabStyled.FilterLabel>
            <TabStyled.FilterIcon />
          </TabStyled.FilterControl>
        }
      </TabStyled>
    );
  }
}
