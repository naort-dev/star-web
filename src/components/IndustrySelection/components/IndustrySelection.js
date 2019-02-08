import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader';
import { fetchAllProfessions } from '../../../store/shared/actions/getProfessions';
import IndustryStyled from '../styled';

class IndustrySelectionComponent extends React.Component {
  state = {
    filterProfessions: [],
    categorySelected: null,
    searchValue: '',
    searchProfessions: [],
    selectedProfessions: this.props.selectedProfessions,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { filterProfessions, searchProfessions } = prevState;
    if (!nextProps.professions.length) {
      nextProps.fetchAllProfessions();
    }
    if (prevState.searchValue !== '') {
      let newProfessions = [];
      nextProps.professions.forEach((profession) => {
        let filteredChildProfessions = [];
        if (profession.title.toLowerCase().indexOf(prevState.searchValue) > -1) {
          filteredChildProfessions = profession.child;
        } else {
          filteredChildProfessions = profession.child.filter(childProfession => childProfession.title.toLowerCase().indexOf(prevState.searchValue) > -1);
        }
        if (filteredChildProfessions.length) {
          newProfessions = [...newProfessions, ...filteredChildProfessions];
        }
      });
      searchProfessions = newProfessions;
    } else {
      filterProfessions = nextProps.professions;
    }
    return ({ filterProfessions, searchProfessions });
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
      this.setState({ selectedProfessions: [...selectedProfessions, profession], searchValue: '' });
    }
  }

  removeSelectedProfession = (id) => {
    let { selectedProfessions } = this.state;
    selectedProfessions = selectedProfessions.filter(profession => profession.id !== id);
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
      <IndustryStyled.selectedItem key={profession.id}>
        {profession.title}
        <IndustryStyled.CloseButton
          onClick={() => this.removeSelectedProfession(profession.id)}
        />
      </IndustryStyled.selectedItem>
    ));
  }

  renderSubProfessions = (profession) => {
    const { selectedProfessions } = this.state;
    const filteredProfessions = profession.child.filter((childProfession) => {
      const professionSelected = selectedProfessions.find(item => item.title === childProfession.title);
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

  renderProfessions = () => {
    const { categorySelected, searchValue, searchProfessions, selectedProfessions } = this.state;
    if (searchValue !== '') {
      const newSearchProfessions = searchProfessions.filter((childProfession) => {
        const professionSelected = selectedProfessions.find(item => item.title === childProfession.title);
        return !professionSelected;
      });
      return (
        <IndustryStyled.ListContainer>
          <IndustryStyled.ListWrapper>
            {
                newSearchProfessions.map(childProfession => (
                  <IndustryStyled.ListItem
                    onClick={() => this.selectProfession(childProfession)}
                    key={childProfession.id}
                  >
                    <IndustryStyled.ListItemContent>{childProfession.title}</IndustryStyled.ListItemContent>
                  </IndustryStyled.ListItem>
                ))
            }
          </IndustryStyled.ListWrapper>
        </IndustryStyled.ListContainer>
      );
    }
    return (
      <React.Fragment>
        {
            categorySelected ?
              <IndustryStyled.InnerCategoryWrapper>
                <IndustryStyled.BackButton onClick={() => this.updateSelectedCategory(null)} />
                <IndustryStyled.ListContainer>
                  <IndustryStyled.ListWrapper>
                    <IndustryStyled.ListItemHeading selected>{categorySelected.title}</IndustryStyled.ListItemHeading>
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
      </React.Fragment>
    );
  }

  render() {
    const { categorySelected, selectedProfessions, searchValue } = this.state;
    const { onSelectionComplete, loading, onClose } = this.props;
    return (
      <IndustryStyled>
        <IndustryStyled.HeaderWrapper>
          <IndustryStyled.BackButton onClick={onClose} />
          <IndustryStyled.HeaderContent>
            <IndustryStyled.HeaderTextWrapper>
              <IndustryStyled.HeaderText>
                Select your industry
              </IndustryStyled.HeaderText>
              <IndustryStyled.CompleteButton onClick={() => onSelectionComplete(selectedProfessions)}>Save</IndustryStyled.CompleteButton>
            </IndustryStyled.HeaderTextWrapper>
            <IndustryStyled.Description>
              Choose the groups you're associated with
            </IndustryStyled.Description>
            <IndustryStyled.SearchWrapper>
              <IndustryStyled.SearchField
                placeholder="Search for your industry"
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
          loading ?
            <IndustryStyled.LoaderWrapper>
              <Loader />
            </IndustryStyled.LoaderWrapper>
          :
            this.renderProfessions()
        }
      </IndustryStyled>
    );
  }
}

const mapStateToProps = state => ({
  professions: state.professionsList.allProfessions,
  loading: state.professionsList.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchAllProfessions: () => dispatch(fetchAllProfessions()),
});

export const IndustrySelection = connect(mapStateToProps, mapDispatchToProps)(IndustrySelectionComponent);
