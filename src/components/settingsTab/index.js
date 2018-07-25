import React from 'react';
import TabStyled from './styled';

const SettingsTab = props => (
  <TabStyled filterSelected={this.props.filterSelected}>
    {
      this.props.heading ?
        <TabStyled.TitleControl titleLabel={this.props.Heading}>
          <TabStyled.TitleLabel>
            {this.props.heading}
          </TabStyled.TitleLabel>
        </TabStyled.TitleControl>
        : null
    }
    {
      !this.props.disableTabs ?
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
        : null
    }
    {
      !this.props.disableFilter && (this.props.selectedCategory != 'featured' || this.props.selected === 'Videos') ?
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
            this.props.filterCount && this.props.filterCount() ?
              <TabStyled.FilterCount>{this.props.filterCount()}</TabStyled.FilterCount>
              : null
          }
        </TabStyled.FilterControl>
        : null
    }
  </TabStyled>
);
export default SettingsTab;
