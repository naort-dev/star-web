import React from 'react';
import { withRouter, Link } from 'react-router-dom';
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

  selectCategory = (label, id, category) => {
    if (label === 'featured') this.setState({ showSubCategory: false });
    if (this.props.history && this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
    }
    if (this.props.selectedCategory === id && category === 'Stars') {
      this.setState({ showSubCategory: !this.state.showSubCategory});
      return;
    }
    if (category === 'Stars') {
      this.setState({ showSubCategory: true });
    }

    if (window.outerWidth<=1024) {
      if (label === 'featured') this.props.toggleMenu();
    }
    this.props.updateCategory(label, id, category);
    if (this.props.updateMainCategory) {
      this.props.updateMainCategory(label, id, category);
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
          onClick={() => this.selectCategory(item.title, item.id, 'Stars')}
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

  renderGroupCategoryList = () => (
    this.props.groupCategory.map(item => (
      <SidebarStyled.ListItem
        key={item.id}
      >
        <SidebarStyled.CategoryTitle
          selected={this.props.selectedCategory === item.id ? true : false}
          onClick={() => this.selectCategory(item.group_name, item.id, 'Group')}
        >
          {item.group_name}
        </SidebarStyled.CategoryTitle>
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
                    <Link to={element.url}>
                      <SidebarStyled.LinkElement>
                        {element.linkName}
                        {
                          element.selectedName === 'requests' && this.props.userDetails.settings_celebrityDetails.pending_requests_count ?
                            <SidebarStyled.InnerListItemCount>
                              {
                                this.props.userDetails.settings_celebrityDetails.pending_requests_count
                              }
                            </SidebarStyled.InnerListItemCount>
                          : null
                        }
                        {
                          element.selectedName === 'myVideos' && this.props.userDetails.settings_userDetails.completed_fan_unseen_count ?
                            <SidebarStyled.InnerListItemCount>
                              {
                                this.props.userDetails.settings_userDetails.completed_fan_unseen_count
                              }
                            </SidebarStyled.InnerListItemCount>
                          : null
                        }
                        {
                          (element.selectedName === 'mygroups' || element.selectedName === 'supporters') && this.props.userDetails.settings_userDetails.group_notification_count ?
                            <SidebarStyled.InnerListItemCount>
                              {
                                this.props.userDetails.settings_userDetails.group_notification_count
                              }
                            </SidebarStyled.InnerListItemCount>
                          : null
                        }
                      </SidebarStyled.LinkElement>
                    </Link>
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
                    this.props.isStar ?
                      <SidebarStyled.Filter>
                        <SidebarStyled.SectionHeading>Star</SidebarStyled.SectionHeading>
                        <SidebarStyled.Separator />
                        <SidebarStyled.ListWrapper>
                          <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle
                              selected={this.props.selectedCategory === 'requests'}
                            >
                              <Link to="/user/bookings">
                                <SidebarStyled.LinkElement>
                                  Requests
                                  {
                                    this.props.userDetails.settings_celebrityDetails.pending_requests_count ?
                                      <SidebarStyled.InnerListItemCount>
                                        {
                                          this.props.userDetails.settings_celebrityDetails.pending_requests_count
                                        }
                                      </SidebarStyled.InnerListItemCount>
                                    : null
                                  }
                                </SidebarStyled.LinkElement>
                              </Link>
                            </SidebarStyled.CategoryTitle>
                          </SidebarStyled.ListItem>
                          <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle
                              selected={this.props.selectedCategory === 'earnings'}
                            >
                              <Link to="/user/earnings">Earnings</Link>
                            </SidebarStyled.CategoryTitle>
                          </SidebarStyled.ListItem>
                          <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle>
                              <Link to="/settings">Settings</Link>
                            </SidebarStyled.CategoryTitle>
                          </SidebarStyled.ListItem>
                          <SidebarStyled.ListItem>
                            <SidebarStyled.CategoryTitle>
                              <Link to="/user/my-groups">
                                <SidebarStyled.LinkElement>
                                  My groups
                                  {
                                    this.props.userDetails.settings_userDetails.group_notification_count ?
                                      <SidebarStyled.InnerListItemCount>
                                        {
                                          this.props.userDetails.settings_userDetails.group_notification_count
                                        }
                                      </SidebarStyled.InnerListItemCount>
                                    : null
                                  }
                                </SidebarStyled.LinkElement>
                              </Link>
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
                          onClick={() => this.selectCategory('featured', '', 'Stars')}
                        >
                          Featured
                        </SidebarStyled.CategoryTitle>
                      </SidebarStyled.ListItem>
                      {
                        this.renderCategoryList()
                      }
                    </SidebarStyled.ListWrapper>
                  </SidebarStyled.Filter>
                  <SidebarStyled.Filter>
                    <SidebarStyled.SectionHeading>Find a Group </SidebarStyled.SectionHeading>
                    <SidebarStyled.Separator />
                    <SidebarStyled.ListWrapper>
                      {
                        this.renderGroupCategoryList()
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
  userDetails: state.userDetails,
  groupCategory: state.groupTypesListing.data,
  isStar: state.userDetails.isStar,
});

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value, category) => dispatch(updateCategory(label, value, category)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
