import React from 'react';
import { SidebarStyled } from './styled';
import { Footer } from '../Footer';

export default class Sidebar extends React.Component {
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
