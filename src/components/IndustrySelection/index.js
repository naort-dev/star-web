import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProfessions } from '../../store/shared/actions/getProfessions';
import IndustryStyled from './styled';

class IndustrySelectionComponent extends React.Component {

  state = {
    filterProfessions: [],
    categorySelected: null,
    searchValue: '',
    selectedProfessions: this.props.selectedProfessions,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { filterProfessions } = prevState;
    if (!nextProps.professions.length) {
      nextProps.fetchAllProfessions();
    }
    if (prevState.searchValue !== '') {
      let newProfessions = [];
      nextProps.professions.filter((profession) => {
        const filteredChildProfessions = profession.child.filter(childProfession => childProfession.title.toLowerCase().indexOf(prevState.searchValue) > -1)
        if (filteredChildProfessions.length) {
          newProfessions = [...newProfessions, { ...profession, child: filteredChildProfessions }];
        }
      });
      filterProfessions = newProfessions;
    } else {
      filterProfessions = nextProps.professions;
    }
    return ({ filterProfessions });
  }

  getSearchValue = (event) => {
    const searchValue = event.target.value.toLowerCase();
    this.setState({ searchValue });
  }

  updateSelectedCategory = (profession) => {
    this.setState({ categorySelected: profession });
  }

  selectProfession = (profession) => {
    const { selectedProfessions } = this.state;
    if (selectedProfessions.length !== this.props.limit) {
      this.setState({ selectedProfessions: [...selectedProfessions, { value: profession.id, label: profession.title }] });
    }
  }

  removeSelectedProfession = (id) => {
    let { selectedProfessions } = this.state;
    selectedProfessions = selectedProfessions.filter(profession => profession.value !== id);
    this.setState({ selectedProfessions });
  }

  renderProfessionList = () => {
    return this.state.filterProfessions.map(profession => (
      <IndustryStyled.ListItem
        onClick={() => this.updateSelectedCategory(profession)}
        key={profession.id}
      >
        <IndustryStyled.ListItemContent>{profession.title}</IndustryStyled.ListItemContent>
        <IndustryStyled.ForwardButton />
      </IndustryStyled.ListItem>
    ));
  }

  renderSelectedProfessions = () => {
    const { selectedProfessions } = this.state;
    return selectedProfessions.map(profession => (
      <IndustryStyled.selectedItem key={profession.value}>
        {profession.label}
        <IndustryStyled.CloseButton
          onClick={() => this.removeSelectedProfession(profession.value)}
        />
      </IndustryStyled.selectedItem>
    ));
  }

  renderSubProfessions = (profession) => {
    const { selectedProfessions } = this.state;
    const filteredProfessions = profession.child.filter((childProfession) => {
      const professionSelected = selectedProfessions.find(item => item.label === childProfession.title);
      return !professionSelected;
    });
    return filteredProfessions.map(childProfession => (
      <IndustryStyled.ListItem
        onClick={() => this.selectProfession(childProfession)}
        key={childProfession.id}
      >
        <IndustryStyled.ListItemContent>{childProfession.title}</IndustryStyled.ListItemContent>
      </IndustryStyled.ListItem>
    ));
  }

  render() {
    const { categorySelected, selectedProfessions, searchValue } = this.state;
    return (
      <IndustryStyled>
        <IndustryStyled.HeaderWrapper>
          <IndustryStyled.BackButton onClick={() => this.props.onSelectionComplete(selectedProfessions)} />
          <IndustryStyled.HeaderContent>
            <IndustryStyled.HeaderText>
              Select your industry
            </IndustryStyled.HeaderText>
            <IndustryStyled.Description>
              You may choose up to a maximum of 3 industries
            </IndustryStyled.Description>
            <IndustryStyled.SearchWrapper>
              <IndustryStyled.SearchField
                placeholder="search for your industry"
                value={searchValue}
                onChange={(event) => this.getSearchValue(event)}
              />
            </IndustryStyled.SearchWrapper>
            <IndustryStyled.ListWrapper>
              {
                this.renderSelectedProfessions()
              }
            </IndustryStyled.ListWrapper>
          </IndustryStyled.HeaderContent>
        </IndustryStyled.HeaderWrapper>
        {
          categorySelected ?
            <IndustryStyled.InnerCategoryWrapper>
              <IndustryStyled.BackButton onClick={() => this.updateSelectedCategory(null)} />
              <IndustryStyled.ListContainer>
                <IndustryStyled.ListWrapper>
                  <IndustryStyled.ListItemContent selected>{categorySelected.title}</IndustryStyled.ListItemContent>
                  {
                    this.renderSubProfessions(categorySelected)
                  }
                </IndustryStyled.ListWrapper>
              </IndustryStyled.ListContainer>
            </IndustryStyled.InnerCategoryWrapper>
          :
            <IndustryStyled.ListContainer>
              <IndustryStyled.ListWrapper>
                {
                  this.renderProfessionList()
                }
              </IndustryStyled.ListWrapper>
            </IndustryStyled.ListContainer>
        }
      </IndustryStyled>
    );
  }
}

const mapStateToProps = state => ({
  professions: state.professionsList.allProfessions,
});

const mapDispatchToProps = dispatch => ({
  fetchAllProfessions: () => dispatch(fetchAllProfessions()),
});

export const IndustrySelection = connect(mapStateToProps, mapDispatchToProps)(IndustrySelectionComponent);
