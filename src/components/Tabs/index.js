import React from 'react';
import TabStyled from './styled';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps = (props) => {
    if (props.selected) { 
      this.adjustPosition(this[props.selected]);
    }
  }

  adjustPosition = (e) => {
    const extraSpace = this.tabList.getBoundingClientRect().x;
    const targetRect = e.getBoundingClientRect();
    const tabsWidth = this.tabList.getBoundingClientRect().width;
    if (targetRect.x < extraSpace) {
      this.tabList.scrollLeft= this.tabList.scrollLeft + targetRect.x - extraSpace;
    } else if (targetRect.x + targetRect.width > tabsWidth) {
      this.tabList.scrollLeft= this.tabList.scrollLeft - tabsWidth + targetRect.x + targetRect.width;
    }
  }

  render() {
    return (
      <TabStyled filterSelected={this.props.filterSelected} hideTab={!this.props.noTabs}>
        {
          this.props.heading ?
            <TabStyled.TitleControl titleLabel={this.props.Heading} starMode={this.props.starMode}>
              {
                this.props.starMode ?
                  <TabStyled.OptionWrapper>
                    <TabStyled.CheckBoxWrapper>
                      <TabStyled.Label className="checkbox_container" onClick={()=> this.props.changeleftCheckSelection()}>
                        <span>Accepting Requests</span>
                        <TabStyled.CheckBox
                          id="accepting-requests"
                          type="checkbox"
                          checked={this.props.leftCheckSelection}
                          onChange={() => {}}
                        />
                        <TabStyled.Span htmlFor="private_video" className="checkmark" />
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
            <TabStyled.tabList hideTab={!this.props.noTabs} disableFilter={this.props.disableFilter} innerRef={node => this.tabList = node}>
              {
                this.props.labels.map((item, index) => (
                  <TabStyled.tabListItem
                    starsPage={this.props.starsPage}
                    disableFilter={this.props.disableFilter}
                    key={index}
                    innerRef={node => this[item] = node}
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
