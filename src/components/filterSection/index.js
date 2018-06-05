import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import FilterStyled from './styled';

export default class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValues: [],
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

  handleSelectChange = (selectedList) => {
    this.setState({ categoryValues: selectedList });
  }

  renderTypeList = () => {
    let options;
    switch (this.props.selectedTab) {
      case 'Stars':
        options = this.props.subCategoryList.map((item) => {
          return {
            label: item.title,
            value: item.id,
          };
        });
        return (
          <FilterStyled.filterItem typeFilter>
            <Select
              closeOnSelect={false}
              multi
              onChange={this.handleSelectChange}
              options={options}
              placeholder="Select a subcategory"
              simpleValue
              value={this.state.categoryValues}
            />
          </FilterStyled.filterItem>
        );
      default:
        return null;
    }
  }

  // renderPriceList = () => {
  //   const priceList = [];
  //   const { selectedPriceRange } = this.props;
  //   let i;
  //   for (i = this.lowPrice; i <= (this.highPrice - 100) / 100; i += 1) {
  //     const low = (100 * i) + 1;
  //     const high = (100 * i) + 100;
  //     priceList.push(
  //       <FilterStyled.filterItem
  //         key={i}
  //         selected={selectedPriceRange.low === low && selectedPriceRange.high === high ? true : false}
  //         onClick={() => this.filterSelection('priceRange', { low, high })}
  //       >
  //         {low}$ - {high}$
  //       </FilterStyled.filterItem>,
  //     );
  //   }
  //   return priceList;
  // }
  render() {
    return (
      <FilterStyled>
        <FilterStyled.filterWrapper>
          {
            this.props.subCategoryList.length ?
              <FilterStyled.filterSection typeFilter>
                <FilterStyled.filterHeading>
                  Type
                </FilterStyled.filterHeading>
                <FilterStyled.filterItemWrapper>
                  {
                    this.renderTypeList()
                  }
                </FilterStyled.filterItemWrapper>
              </FilterStyled.filterSection>
            :
              null
          }
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
              <FilterStyled.filterItem
                selected={this.props.selectedSort === 'lpf' ? true : false}
                onClick={() => this.filterSelection('sort', 'lpf')}
              >
                $ - $$$
              </FilterStyled.filterItem>
              <FilterStyled.filterItem
                selected={this.props.selectedSort === 'hpf' ? true : false}
                onClick={() => this.filterSelection('sort', 'hpf')}
              >
                $$$ - $
              </FilterStyled.filterItem>
            </FilterStyled.filterItemWrapper>
          </FilterStyled.filterSection>
        </FilterStyled.filterWrapper>
      </FilterStyled>
    );
  }
}
