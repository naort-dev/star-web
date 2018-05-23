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
  componentWillMount() {
    this.props.fetchProfessionsList();
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
                updateCategory={value => this.props.updateCategory(value)}
              />
            </Scrollbars>
          </LandingStyled.sideSection>
          <LandingStyled.mainSection menuActive={this.state.menuActive}>
            <Tabs labels={['All', 'Stars', 'Videos']} selected="Stars" />
            <ScrollList
              dataList={this.props.celebList}
              fetchData={(offset, refresh) => this.props.fetchCelebrityList(offset, refresh)}
            />
          </LandingStyled.mainSection>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
};
