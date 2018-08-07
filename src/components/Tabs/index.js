import React from 'react';
import TabStyled from './styled';
import './checkboxStyled';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <TabStyled filterSelected={this.props.filterSelected}>
        {
          this.props.heading ?
            <TabStyled.TitleControl titleLabel={this.props.Heading} starMode={this.props.starMode}>
              {
                this.props.starMode ?
                  <TabStyled.OptionWrapper>
                    <TabStyled.CheckBoxWrapper>
                      <TabStyled.Label id="checkbox_container" onClick={()=> this.props.changeleftCheckSelection()}>
                        <span>Accepting Requests</span>
                        <TabStyled.CheckBox
                          id="accepting-requests"
                          type="checkbox"
                          checked={this.props.leftCheckSelection}
                          onChange={() => {}}
                        />
                        <TabStyled.Span htmlFor="private_video" id="checkmark" />
                      </TabStyled.Label>
                    </TabStyled.CheckBoxWrapper>
                  </TabStyled.OptionWrapper>
                :
                  <TabStyled.TitleLabel>
                    {this.props.heading}
                  </TabStyled.TitleLabel>
              }
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
          !this.props.disableFilter && (this.props.selectedCategory!='featured' || this.props.selected === 'Videos') ?
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
  }
}
