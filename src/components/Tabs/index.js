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
      <TabStyled filterSelected={this.props.filterSelected}>
        <TabStyled.tabList disableFilter={this.props.disableFilter}>
          {
            this.props.labels.map((item, index) => (
              <TabStyled.tabListItem
                starsPage={this.props.starsPage}
                disableFilter={this.props.disableFilter}
                key={index}
                onClick={() => this.props.switchTab(item)}
                selected={this.props.selected === item}
              >
                {item}
              </TabStyled.tabListItem>
            ))
          }
        </TabStyled.tabList>
        {
          !this.props.disableFilter && (this.props.selectedCategory!='featured' || this.props.selected === 'Videos') &&
          <TabStyled.FilterControl
            onClick={this.props.toggleFilter}
            filterSelected={this.props.filterSelected}
          >
            <TabStyled.FilterLabel
              filterSelected={this.props.filterSelected}
            >
              Filter
            </TabStyled.FilterLabel>
            <TabStyled.FilterIcon
              filterSelected={this.props.filterSelected}
            />
            {
            this.props.filterCount() ?
              <TabStyled.FilterCount>{this.props.filterCount()}</TabStyled.FilterCount>
            : null
            }
          </TabStyled.FilterControl>
        }
      </TabStyled>
    );
  }
}
