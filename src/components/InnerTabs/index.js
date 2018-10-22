import React from 'react';
import TabStyled from './styled';

export default class InnerTabs extends React.Component {
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
      <TabStyled>
        {
          !this.props.disableTabs ?
            <TabStyled.tabList innerRef={node => this.tabList = node}>
              {
                this.props.labels.map((item, index) => (
                  <TabStyled.tabListItem
                    disableFilter={this.props.disableFilter}
                    itemCount={this.props.labels.length}
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
      </TabStyled>
    );
  }
}
