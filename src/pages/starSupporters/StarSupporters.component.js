import React from 'react';

import ColumnLayout from '../../components/ColumnLayout';
import InnerTabs from '../../components/InnerTabs';
import SupportStyled from './styled';

export default class StarSupporters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTabs: false,
      selectedTab: 'All',
    };
  }

  switchTab = (selectedTab) => {
    this.setState({ selectedTab });
  }

  showTabs = () => {
    this.setState({ showTabs: true });
  }

  renderList = () => {
    return (
      <React.Fragment>
        <InnerTabs
          labels={['All', 'Supporters', 'Pending']}
          switchTab={this.switchTab}
          selected={this.state.selectedTab}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <ColumnLayout
          selectedSideBarItem="supporters"
          history={this.props.history}
        >
          <SupportStyled>
            <SupportStyled.CenterSection>
              {
                this.state.showTabs ?
                  this.renderList(this.props)
                :
                  <React.Fragment>
                    <SupportStyled.SmallHeading>
                        Stars who support your group
                    </SupportStyled.SmallHeading>
                    <SupportStyled.Container>
                      <SupportStyled.BigHeading>
                        Invite and share your Starsona profile
                      </SupportStyled.BigHeading>
                      <SupportStyled.Description>
                        Lorem Ipsum
                      </SupportStyled.Description>
                      <SupportStyled.ControlWrapper>
                        <SupportStyled.ControlButton onClick={this.showTabs}>
                          Invite stars
                        </SupportStyled.ControlButton>
                      </SupportStyled.ControlWrapper>
                    </SupportStyled.Container>
                  </React.Fragment>
              }
            </SupportStyled.CenterSection>
          </SupportStyled>
        </ColumnLayout>
      </div>
    );
  }
}
