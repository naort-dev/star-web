import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { openStatusList, celebOpenStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';
import FilterStyled from './styled';

export default class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.lowPrice = 0;
    this.highPrice = 500;
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
      const openStatuses = this.props.starMode ? celebOpenStatusList : openStatusList;
      const completedStatus = this.props.starMode ? celebCompletedStatusList : completedStatusList; // 6 = completed
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
              : null
                // <FilterStyled.filterSection>
                //   <FilterStyled.filterHeading>
                //     Upload Date
                //   </FilterStyled.filterHeading>
                //   <FilterStyled.filterItemWrapper>
                //     <FilterStyled.filterItem
                //       selected={this.props.selectedVideoDate === 'today' ? true : false}
                //       onClick={() => this.filterSelection('video_upload_date', 'today')}
                //     >
                //       Today
                //     </FilterStyled.filterItem>
                //     <FilterStyled.filterItem
                //       selected={this.props.selectedVideoDate === 'last_7_days' ? true : false}
                //       onClick={() => this.filterSelection('video_upload_date', 'last_7_days')}
                //     >
                //       This Week
                //     </FilterStyled.filterItem>
                //     <FilterStyled.filterItem
                //       selected={this.props.selectedVideoDate === 'this_month' ? true : false}
                //       onClick={() => this.filterSelection('video_upload_date', 'this_month')}
                //     >
                //       This Month
                //     </FilterStyled.filterItem>
                //     <FilterStyled.filterItem
                //       selected={this.props.selectedVideoDate === 'this_year' ? true : false}
                //       onClick={() => this.filterSelection('video_upload_date', 'this_year')}
                //     >
                //       This Year
                //     </FilterStyled.filterItem>
                //   </FilterStyled.filterItemWrapper>
                // </FilterStyled.filterSection>
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
