import React from 'react';
import TabStyled from './styled';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSelected: false,
    };
  }
  toggleFilter = () => {
    this.setState({ filterSelected: !this.state.filterSelected });
    this.props.toggleFilter();
  }
  render() {
    console.log(this.state.filterSelected);
    return (
      <TabStyled>
        <TabStyled.tabList>
          {
            this.props.labels.map((item, index) => (
              <TabStyled.tabListItem
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
          !this.props.disableFilter &&
          <TabStyled.FilterControl filterSelected={this.state.filterSelected}>
            <TabStyled.FilterLabel>Filter</TabStyled.FilterLabel>
            <TabStyled.FilterIcon onClick={this.toggleFilter} />
          </TabStyled.FilterControl>
        }
      </TabStyled>
    );
  }
}
