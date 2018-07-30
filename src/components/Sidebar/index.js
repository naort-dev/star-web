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
          this.props.selectedCategory === item.id ?
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

  render() {
    return (
      <SidebarStyled menuActive={this.props.menuActive}>
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
                      <SidebarStyled.CategoryTitle>
                        Earnings
                      </SidebarStyled.CategoryTitle>
                    </SidebarStyled.ListItem>
                    <SidebarStyled.ListItem>
                      <SidebarStyled.CategoryTitle>
                        My Star Page
                      </SidebarStyled.CategoryTitle>
                    </SidebarStyled.ListItem>
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
        <Footer />
      </SidebarStyled>
    );
  }
}
const mapStateToProps = state => ({
  starRole: state.session.starRole,
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
