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
  renderPriceList = () => {
    const priceList = [];
    let i;
    for (i = this.lowPrice; i <= (this.highPrice - 100) / 100; i += 1) {
      const low = (100 * i) + 1;
      const high = (100 * i) + 100;
      priceList.push(
        <FilterStyled.filterItem
          key={i}
          onClick={() => this.props.updatePriceRange(low, high)}
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
              <FilterStyled.filterItem>A - Z</FilterStyled.filterItem>
              <FilterStyled.filterItem>Z - A</FilterStyled.filterItem>
            </FilterStyled.filterItemWrapper>
          </FilterStyled.filterSection>
        </FilterStyled.filterWrapper>
      </FilterStyled>
    );
  }
}
