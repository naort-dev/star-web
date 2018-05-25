import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header } from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import LandingStyled from './styled';
import ScrollList from '../../components/ScrollList';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const filterChange = this.props.filters.category !== nextProps.filters.category
    if(filterChange) {
      this.props.fetchCelebrityList(0, true);
    }
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <LandingStyled>
        <Header menuActive={this.state.menuActive} enableMenu={() => this.activateMenu()} />
        <LandingStyled.sectionWrapper>
          <LandingStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                menuActive={this.state.menuActive}
                toggleMenu={() => this.activateMenu()}
                updateCategory={(label, value) => this.props.updateCategory(label, value)}
              />
            </Scrollbars>
          </LandingStyled.sideSection>
          <LandingStyled.mainSection menuActive={this.state.menuActive}>
            <Tabs
              labels={['Stars', 'Videos']}
              selected="Stars"
            />
            <ScrollList
              dataList={this.props.celebList.data}
              totalCount={this.props.celebList.count}
              offset={this.props.celebList.offset}
              loading={this.props.celebList.loading}
              fetchData={(offset, refresh) => this.props.fetchCelebrityList(offset, refresh)}
            />
          </LandingStyled.mainSection>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
};
