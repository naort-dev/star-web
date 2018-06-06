import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import FilterStyled from './styled';

export default class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: props.selectedPriceRange.low === '' ? 0 : props.selectedPriceRange.low,
      maxPrice: props.selectedPriceRange.high === '' ? 500 : props.selectedPriceRange.high,
    };
    this.lowPrice = 0;
    this.highPrice = 500;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedPriceRange.low !== nextProps.selectedPriceRange.low) {
      this.setState({ minPrice: nextProps.selectedPriceRange.low });
    }
    if (this.props.selectedPriceRange.high !== nextProps.selectedPriceRange.high) {
      this.setState({ maxPrice: nextProps.selectedPriceRange.high });
    }
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
      case 'video_type':
        this.props.updateSelectedVideoType(data);
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
          <FilterStyled.filterSection typeFilter>
            <FilterStyled.filterHeading>
              Type
            </FilterStyled.filterHeading>
            {
              this.props.selectedTab !== 'Videos' && this.props.subCategoryList && this.props.subCategoryList.length ?
                <FilterStyled.filterTypeWrapper>
                  <Scrollbars>
                    <FilterStyled.filterTypeList>
                      <FilterStyled.filterTypeItem
                        selected={this.props.selectedSubCategories && Object.keys(this.props.selectedSubCategories).length ? false : true}
                        onClick={() => this.props.updateSelectedSubCategory({})}
                      >
                        All
                      </FilterStyled.filterTypeItem>
                      {
                        this.renderTypeList()
                      }
                    </FilterStyled.filterTypeList>
                  </Scrollbars>
                </FilterStyled.filterTypeWrapper>
              :
                <FilterStyled.filterItemWrapper>
                  <FilterStyled.filterItem
                    selected={this.props.selectedVideoType === '' ? true : false}
                    onClick={() => this.filterSelection('video_type', '')}
                  >
                    All
                  </FilterStyled.filterItem>
                  <FilterStyled.filterItem
                    selected={this.props.selectedVideoType === 3 ? true : false}
                    onClick={() => this.filterSelection('video_type', 3)}
                  >
                    Q&A
                  </FilterStyled.filterItem>
                  <FilterStyled.filterItem
                    selected={this.props.selectedVideoType === 2 ? true : false}
                    onClick={() => this.filterSelection('video_type', 2)}
                  >
                    Event Announcement
                  </FilterStyled.filterItem>
                  <FilterStyled.filterItem
                    selected={this.props.selectedVideoType === 1 ? true : false}
                    onClick={() => this.filterSelection('video_type', 1)}
                  >
                    Shoutouts
                  </FilterStyled.filterItem>
                </FilterStyled.filterItemWrapper>
            }
          </FilterStyled.filterSection>
          {/* <FilterStyled.filterSection typeFilter>
            <FilterStyled.filterHeading>
              Price
            </FilterStyled.filterHeading>
            <FilterStyled.filterItemWrapper>
              <FilterStyled.filterPriceItem>
                <div>{this.state.minPrice}$ - {this.state.maxPrice}$</div>
                <Range
                  handleStyle={[{ borderColor: '#FF6C58', backgroundColor: '#FF6C58' }, { borderColor: '#FF6C58', backgroundColor: '#FF6C58' }]}
                  trackStyle={[{ backgroundColor: '#FF6C58' }]}
                  onChange={value => this.setState({ minPrice: value[0], maxPrice: value[1] })}
                  onAfterChange={value => this.props.updatePriceRange(value[0], value[1])}
                  allowCross={false}
                  value={[this.state.minPrice, this.state.maxPrice]}
                  min={0}
                  max={500}
                />
                <FilterStyled.priceSliderMinLabel>0</FilterStyled.priceSliderMinLabel>
                <FilterStyled.priceSliderMaxLabel>500+</FilterStyled.priceSliderMaxLabel>
              </FilterStyled.filterPriceItem>
            </FilterStyled.filterItemWrapper>
          </FilterStyled.filterSection> */}
          {
            this.props.selectedTab !== 'Videos' ?
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
            : null
          }
        </FilterStyled.filterWrapper>
      </FilterStyled>
    );
  }
}
