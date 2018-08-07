import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Range } from 'rc-slider';
import { openStatusList } from '../../constants/requestStatusList';
import 'rc-slider/assets/index.css';
import FilterStyled from './styled';

export default class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // minPrice: props.selectedPriceRange.low === '' ? 0 : props.selectedPriceRange.low,
      // maxPrice: props.selectedPriceRange.high === '' ? 500 : props.selectedPriceRange.high,
    };
    this.lowPrice = 0;
    this.highPrice = 500;
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.selectedPriceRange.low !== nextProps.selectedPriceRange.low) {
    //   this.setState({ minPrice: nextProps.selectedPriceRange.low });
    // }
    // if (this.props.selectedPriceRange.high !== nextProps.selectedPriceRange.high) {
    //   this.setState({ maxPrice: nextProps.selectedPriceRange.high });
    // }
  }

  filterSelection = (type, data) => {
    this.props.toggleFilter();
    switch (type) {
      case 'priceRange': this.props.updatePriceRange(data.low, data.high);
        break;
      case 'sort': this.props.updateSort(data);
        break;
      case 'video_type':
        this.props.updateSelectedVideoType(data);
        break;
      case 'video_upload_date':
        this.props.updateSelectedVideoDate(data);
        break;
      case 'request_status':
        this.props.updateRequestStatus(data)
      default: break;
    }
  }
  render() {
    if (this.props.requestStatus) {
      const openStatuses = this.props.starMode ? openStatusList : [...openStatusList, 4]; // 4 = Admin Approval waiting
      const completedStatus = this.props.starMode ? [4, 6] : [6]; // 6 = completed
      return (
        <FilterStyled filterActive={this.props.filterSelected}>
          <FilterStyled.CloseButton
            onClick={() => this.props.toggleFilter()}
          />
          <Scrollbars>
            <FilterStyled.filterWrapper>
              <FilterStyled.filterSection>
                <FilterStyled.filterHeading>
                  Request Status
                </FilterStyled.filterHeading>
                <FilterStyled.filterItemWrapper>
                  <FilterStyled.filterItem
                    selected={this.props.selectedRequestStatus === 'all' ? true : false}
                    onClick={() => this.filterSelection('request_status', 'all')}
                  >
                    All
                  </FilterStyled.filterItem>
                  <FilterStyled.filterItem
                    selected={openStatuses.toString().indexOf(this.props.selectedRequestStatus) > -1 ? true : false}
                    onClick={() => this.filterSelection('request_status', openStatuses.toString())}
                  >
                    Open
                  </FilterStyled.filterItem>
                  <FilterStyled.filterItem
                    selected={this.props.selectedRequestStatus === 5 ? true : false}
                    onClick={() => this.filterSelection('request_status', 5)}
                  >
                    Cancelled
                  </FilterStyled.filterItem>
                  <FilterStyled.filterItem
                    selected={completedStatus.toString().indexOf(this.props.selectedRequestStatus) > -1 ? true : false}
                    onClick={() => this.filterSelection('request_status', completedStatus.toString())}
                  >
                    Completed
                  </FilterStyled.filterItem>
                </FilterStyled.filterItemWrapper>
              </FilterStyled.filterSection>
            </FilterStyled.filterWrapper>
          </Scrollbars>
        </FilterStyled>
      );
    }
    return (
      <FilterStyled filterActive={this.props.filterSelected}>
        <FilterStyled.CloseButton
          onClick={() => this.props.toggleFilter()}
        />
        <Scrollbars>
          <FilterStyled.filterWrapper>
            {
              this.props.selectedTab !== 'Videos' ?
                null
              :
                <FilterStyled.filterSection typeFilter={this.props.selectedTab !== 'Videos' ? true : false}>
                  <FilterStyled.filterHeading>
                    Type
                  </FilterStyled.filterHeading>
                  <FilterStyled.filterItemWrapper>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoType === '' ? true : false}
                      onClick={() => this.filterSelection('video_type', '')}
                    >
                      All
                    </FilterStyled.filterItem>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoType === 1 ? true : false}
                      onClick={() => this.filterSelection('video_type', 1)}
                    >
                      Shout-outs
                    </FilterStyled.filterItem>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoType === 2 ? true : false}
                      onClick={() => this.filterSelection('video_type', 2)}
                    >
                      Event Announcement
                    </FilterStyled.filterItem>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoType === 3 ? true : false}
                      onClick={() => this.filterSelection('video_type', 3)}
                    >
                      Q&A
                    </FilterStyled.filterItem>
                  </FilterStyled.filterItemWrapper>
                </FilterStyled.filterSection>
            }
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
                    Sort By
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
              :
                <FilterStyled.filterSection>
                  <FilterStyled.filterHeading>
                    Upload Date
                  </FilterStyled.filterHeading>
                  <FilterStyled.filterItemWrapper>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoDate === 'today' ? true : false}
                      onClick={() => this.filterSelection('video_upload_date', 'today')}
                    >
                      Today
                    </FilterStyled.filterItem>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoDate === 'last_7_days' ? true : false}
                      onClick={() => this.filterSelection('video_upload_date', 'last_7_days')}
                    >
                      This Week
                    </FilterStyled.filterItem>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoDate === 'this_month' ? true : false}
                      onClick={() => this.filterSelection('video_upload_date', 'this_month')}
                    >
                      This Month
                    </FilterStyled.filterItem>
                    <FilterStyled.filterItem
                      selected={this.props.selectedVideoDate === 'this_year' ? true : false}
                      onClick={() => this.filterSelection('video_upload_date', 'this_year')}
                    >
                      This Year
                    </FilterStyled.filterItem>
                  </FilterStyled.filterItemWrapper>
                </FilterStyled.filterSection>
            }
          </FilterStyled.filterWrapper>
          {/* <FilterStyled.ApplyButtonWrapper>
            <FilterStyled.ApplyButton>Apply</FilterStyled.ApplyButton>
          </FilterStyled.ApplyButtonWrapper> */}
        </Scrollbars>
      </FilterStyled>
    );
  }
}
