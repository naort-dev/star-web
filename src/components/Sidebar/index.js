import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    if (label === 'featured') this.setState({ showSubCategory: false });
    if (this.props.selectedCategory === id) {
      this.setState({ showSubCategory: !this.state.showSubCategory});
      return;
    }
    this.setState({ showSubCategory: true });

    if (window.outerWidth<=1024) {
      if (label === 'featured') this.props.toggleMenu();
    }
    this.props.updateCategory(label, id);
    if (this.props.updateMainCategory) {
      this.props.updateMainCategory(label, id);
    }
    if (this.props.history && this.props.history.location.pathname != '/') {
      this.props.history.push('/');
    }
  }

  selectSubCategory = (label, value) => {
    const selectedList = this.props.selectedSubCategories ? this.props.selectedSubCategories : {};
    if (selectedList.hasOwnProperty(value)) {
      delete selectedList[value];
    } else {
      selectedList[value] = label;
    }
    this.props.updateSelectedSubCategory(selectedList);
  }

  renderCategoryList = () => (
    this.props.list.professions.map(item => (
      <SidebarStyled.ListItem
        key={item.id}
      >
        <SidebarStyled.CategoryTitle
          selected={this.props.selectedCategory === item.id ? true : false}
          onClick={() => this.selectCategory(item.title, item.id)}
        >
          {item.title}
        </SidebarStyled.CategoryTitle>
        {
          (this.props.selectedCategory === item.id && this.state.showSubCategory) ?
            <SidebarStyled.SubCategoryList>
              <SidebarStyled.SubCategoryListItem
                selected={this.props.selectedSubCategories && Object.keys(this.props.selectedSubCategories).length ? false : true}
                onClick={() => this.props.updateSelectedSubCategory({})}
              >
                All
              </SidebarStyled.SubCategoryListItem>
              {
                item.child.map(subCategory => (
                  <SidebarStyled.SubCategoryListItem
                    key={subCategory.id}
                    selected={this.props.selectedSubCategories && this.props.selectedSubCategories.hasOwnProperty(subCategory.id)}
                    onClick={() => this.selectSubCategory(subCategory.title, subCategory.id)}
                  >
                    {subCategory.title}
                  </SidebarStyled.SubCategoryListItem>
                ))
              }
            </SidebarStyled.SubCategoryList>
          : null
        }
      </SidebarStyled.ListItem>
    ))
  )

  renderInnerPageLinks = () => {
    return (
      <SidebarStyled.FilterWrapper>
        <SidebarStyled.Filter>
          <SidebarStyled.ListWrapper>
            {
              this.props.innerLinks && this.props.innerLinks.map((element, index) => (
                <SidebarStyled.InnerListItem key={index}>
                  <SidebarStyled.InnerCategoryTitle
                    selected={this.props.selectedCategory === element.selectedName}
                  >
                    <Link to={element.url}>{element.linkName}</Link>
                  </SidebarStyled.InnerCategoryTitle>
                </SidebarStyled.InnerListItem>
              ))
            }
          </SidebarStyled.ListWrapper>
        </SidebarStyled.Filter>
      </SidebarStyled.FilterWrapper>
    );
  }

  render() {
    return (
      <SidebarStyled menuActive={this.props.menuActive}>
        {
          !this.props.noCategory ?
            <React.Fragment>
              <section>
                <SidebarStyled.FilterWrapper>
                  {
                    this.props.starRole ?
                      <SidebarStyled.Filter>
                        <SidebarStyled.SectionHeading>Star</SidebarStyled.SectionHeading>
                        <SidebarStyled.Separator />
                        <SidebarStyled.ListWrapper>
                          <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle
                              selected={this.props.selectedCategory === 'requests'}
                            >
                              <Link to={'/user/bookings'}>Requests</Link>
                            </SidebarStyled.CategoryTitle>
                          </SidebarStyled.ListItem>
                          <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle
                              selected={this.props.selectedCategory === 'earnings'}
                            >
                              <Link to={'/user/earnings'}>Earnings</Link>
                            </SidebarStyled.CategoryTitle>
                          </SidebarStyled.ListItem>
                          {/* <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle>
                              <Link to="/myStar">My Star Page</Link>
                            </SidebarStyled.CategoryTitle>
                          </SidebarStyled.ListItem> */}
                        </SidebarStyled.ListWrapper>
                      </SidebarStyled.Filter>
                    : null
                  }
                  <SidebarStyled.Filter>
                    <SidebarStyled.SectionHeading>Find a Star </SidebarStyled.SectionHeading>
                    <SidebarStyled.Separator />
                    <SidebarStyled.ListWrapper>
                      <SidebarStyled.ListItem>
                        <SidebarStyled.CategoryTitle
                          selected={this.props.selectedCategory === '' ? true : false}
                          onClick={() => this.selectCategory('featured', '')}
                        >
                          Featured
                        </SidebarStyled.CategoryTitle>
                      </SidebarStyled.ListItem>
                      {
                        this.renderCategoryList()
                      }
                    </SidebarStyled.ListWrapper>
                  </SidebarStyled.Filter>
                </SidebarStyled.FilterWrapper>
              </section>
              <Footer isLoggedIn={this.props.isLoggedIn}/>
              <SidebarStyled.ApplyButton onClick={() => this.props.toggleMenu()}>Apply</SidebarStyled.ApplyButton>
            </React.Fragment>
          : this.renderInnerPageLinks()
        }
      </SidebarStyled>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  starRole: state.userDetails.starRole,
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
