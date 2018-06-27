import React from 'react';
import { connect } from 'react-redux';
import { SidebarStyled } from './styled';
import { Footer } from '../Footer';
import { updateCategory } from '../../pages/landing/actions/updateFilters';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  selectCategory = (label, id) => {
    if (window.outerWidth<=1024) {
      this.props.toggleMenu();
    }
    this.props.updateCategory(label, id);
    if (this.props.updateMainCategory) {
      this.props.updateMainCategory(label, id);
    }
    if (this.props.history && this.props.history.location.pathname != '/') {
      this.props.history.push('/');
    }
  }

  renderCategoryList = () => (
    this.props.list.professions.map(item => (
      <SidebarStyled.ListItem
        key={item.id}
        selected={this.props.selectedCategory === item.id ? true : false}
        onClick={() => this.selectCategory(item.title, item.id)}
      >
        {item.title}
      </SidebarStyled.ListItem>
    ))
  )

  render() {
    return (
      <SidebarStyled menuActive={this.props.menuActive}>
        <section>
          <SidebarStyled.FilterWrapper>
            {/* <SidebarStyled.Filter>
              <SidebarStyled.SectionHeading>Star</SidebarStyled.SectionHeading>
              <SidebarStyled.Separator />
              <SidebarStyled.ListWrapper>
                <SidebarStyled.ListItem>Requests</SidebarStyled.ListItem>
                <SidebarStyled.ListItem>Earnings</SidebarStyled.ListItem>
                <SidebarStyled.ListItem>My Star Page</SidebarStyled.ListItem>
              </SidebarStyled.ListWrapper>
            </SidebarStyled.Filter> */}
            <SidebarStyled.Filter>
              <SidebarStyled.SectionHeading>Find a Star </SidebarStyled.SectionHeading>
              <SidebarStyled.Separator />
              <SidebarStyled.ListWrapper>
                <SidebarStyled.ListItem
                  selected={this.props.selectedCategory === '' ? true : false}
                  onClick={() => this.selectCategory('featured', '')}
                >
                  Featured
                </SidebarStyled.ListItem>
                {
                  this.renderCategoryList()
                }
              </SidebarStyled.ListWrapper>
            </SidebarStyled.Filter>
          </SidebarStyled.FilterWrapper>
        </section>
        <Footer />
      </SidebarStyled>
    );
  }
}
const mapStateToProps = state => ({
  // filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
