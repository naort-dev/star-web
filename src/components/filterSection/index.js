import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
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
    if (this.props.toggleFilter && type !== 'category') {
      this.props.toggleFilter();
    }
    let selectedList;
    switch (type) {
      case 'priceRange': this.props.updatePriceRange(data.low, data.high);
        break;
      case 'sort': this.props.updateSort(data);
        break;
      case 'category':
        selectedList = this.props.selectedSubCategories ? this.props.selectedSubCategories : {};
        if (selectedList.hasOwnProperty(data.value)) {
          delete selectedList[data.value];
        } else {
          selectedList[data.value] = data.label;
        }
        this.props.updateSelectedSubCategory(selectedList);
        break;
      default: break;
    }
  }

  renderTypeList = () => {
    switch (this.props.selectedTab) {
      case 'Stars':
        return this.props.subCategoryList.map((item, index) => (
          <FilterStyled.filterTypeItem
            key={index}
            selected={this.props.selectedSubCategories && this.props.selectedSubCategories.hasOwnProperty(item.id)}
            onClick={() => this.filterSelection('category', { label: item.title, value: item.id })}
          >
            {item.title}
          </FilterStyled.filterTypeItem>
        ));
      default:
        return null;
    }
  }
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
                <FilterStyled.filterTypeWrapper>
                  <Scrollbars>
                    <FilterStyled.filterTypeItem
                      selected={this.props.selectedSubCategories && !Object.keys(this.props.selectedSubCategories).length}
                      onClick={() => this.props.updateSelectedSubCategory({})}
                    >
                      All
                    </FilterStyled.filterTypeItem>
                    {
                      this.renderTypeList()
                    }
                  </Scrollbars>
                </FilterStyled.filterTypeWrapper>
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
