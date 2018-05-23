import React from 'react';
import { SidebarStyled } from './styled';
import { Footer } from '../Footer';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: '',
    };
  }

  selectCategory = (id) => {
    this.setState({ selectedId: id });
    this.props.toggleMenu();
    this.props.updateCategory(id);
  }

  renderCategoryList = () => (
    this.props.list.professions.map(item => (
      <SidebarStyled.ListItem
        key={item.id}
        selected={this.state.selectedId === item.id ? true : false}
        onClick={() => this.selectCategory(item.id)}
      >
        {item.title}
      </SidebarStyled.ListItem>
    ))
  )

  render() {
    return (
      <SidebarStyled menuActive={this.props.menuActive}>
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
                selected={this.state.selectedId === '' ? true : false}
                onClick={() => this.selectCategory('')}
              >
                Featured
              </SidebarStyled.ListItem>
              {
                this.renderCategoryList()
              }
            </SidebarStyled.ListWrapper>
          </SidebarStyled.Filter>
        </SidebarStyled.FilterWrapper>
        <Footer />
      </SidebarStyled>
    );
  }
}
