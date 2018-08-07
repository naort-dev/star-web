import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import EarningsList from '../../components/EarningsList';
import EarningStyled from './styled';

export default class Earnings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      listData: props.pendingList,
    };
  }
  componentWillMount() {
    this.props.fetchEarningsList();
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <EarningStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        />
        <EarningStyled.sectionWrapper>
          <EarningStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                history={this.props.history}
                selectedCategory={'earnings'}
                menuActive={this.state.menuActive}
                toggleMenu={this.activateMenu}
              />
            </Scrollbars>
          </EarningStyled.sideSection>
          <EarningStyled.mainSection menuActive={this.state.menuActive}>
            <EarningStyled.Overview>
              <EarningStyled.OverviewItem>
                <EarningStyled.OverviewAmount>$35,000</EarningStyled.OverviewAmount>
                <EarningStyled.OverViewText>Total Video Sales</EarningStyled.OverViewText>
                <EarningStyled.OverViewSubText>You have created 70 videos</EarningStyled.OverViewSubText>
              </EarningStyled.OverviewItem>
              <EarningStyled.OverviewItem>
                <EarningStyled.OverviewAmount>$2000</EarningStyled.OverviewAmount>
                <EarningStyled.OverViewText>Pending Videos</EarningStyled.OverViewText>
                <EarningStyled.OverViewSubText>You have 7 videos to fulfill</EarningStyled.OverViewSubText>
              </EarningStyled.OverviewItem>
              <EarningStyled.OverviewItem>
                <EarningStyled.OverviewAmount>$500</EarningStyled.OverviewAmount>
                <EarningStyled.OverViewText>Scheduled Payment</EarningStyled.OverViewText>
                <EarningStyled.OverViewSubText>will be paid out on 4/5/2018</EarningStyled.OverViewSubText>
              </EarningStyled.OverviewItem>
            </EarningStyled.Overview>
            <EarningsList
              dataList={this.props.pendingList}
            />
          </EarningStyled.mainSection>
        </EarningStyled.sectionWrapper>
      </EarningStyled>
    );
  }
}
