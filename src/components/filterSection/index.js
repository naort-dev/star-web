import React from 'react';
import FilterStyled from './styled';

export default class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.lowPrice = 0;
    this.highPrice = 500;
  }
  filterSelection = (type, data) => {
    if (this.props.toggleFilter) {
      this.props.toggleFilter();
    }
    switch (type) {
      case 'priceRange': this.props.updatePriceRange(data.low, data.high);
        break;
      case 'sort': this.props.updateSort(data);
        break;
      default: break;
    }
  }
  renderPriceList = () => {
    const priceList = [];
    const { selectedPriceRange } = this.props;
    let i;
    for (i = this.lowPrice; i <= (this.highPrice - 100) / 100; i += 1) {
      const low = (100 * i) + 1;
      const high = (100 * i) + 100;
      priceList.push(
        <FilterStyled.filterItem
          key={i}
          selected={selectedPriceRange.low === low && selectedPriceRange.high === high ? true : false}
          onClick={() => this.filterSelection('priceRange', { low, high })}
        >
          {low}$ - {high}$
        </FilterStyled.filterItem>,
      );
    }
    return priceList;
  }
  render() {
    return (
      <FilterStyled>
        <FilterStyled.filterWrapper>
          <FilterStyled.filterSection>
            <FilterStyled.filterHeading>
              Price
            </FilterStyled.filterHeading>
            <FilterStyled.filterItemWrapper>
              {
                this.renderPriceList()
              }
            </FilterStyled.filterItemWrapper>
          </FilterStyled.filterSection>
          <FilterStyled.filterSection>
            <FilterStyled.filterHeading>
              Sort
            </FilterStyled.filterHeading>
            <FilterStyled.filterItemWrapper>
              <FilterStyled.filterItem
                selected={this.props.selectedSort === 'az' ? true : false}
                onClick={() => this.filterSelection('sort', 'az')}
              >
                A - Z
              </FilterStyled.filterItem>
              <FilterStyled.filterItem
                selected={this.props.selectedSort === 'za' ? true : false}
                onClick={() => this.filterSelection('sort', 'za')}
              >
                Z - A
              </FilterStyled.filterItem>
            </FilterStyled.filterItemWrapper>
          </FilterStyled.filterSection>
        </FilterStyled.filterWrapper>
      </FilterStyled>
    );
  }
}
