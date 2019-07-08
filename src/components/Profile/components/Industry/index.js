import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import { Layout, Heading, Wrapper, UploadContainer } from  './styled';
import { BackArrow, CloseButton } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import MultiSelect from '../../../../components/MultiSelect';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings';
import NestedSelect from '../../../../components/NestedSelect'; 
import RequestFlowPopup from '../../../../components/RequestFlowPopup';

const Industry = props => {

  const [selectedProfessions, setselectedProfessions] = useState(props.userDetails.settings_celebrityDetails.profession_details ? props.userDetails.settings_celebrityDetails.profession_details : []);
  const [showBrowseCategory, setshowBrowseCategory] = useState(false);
  const [categories, setcategories] = useState({
    subCategoriesArray: [],
    selectedCategory: [],
  });

  const saveIndustry = () => {
    const finalUserDetails = {
      celebrity_details: {
        profession: selectedProfessions.map(profession => profession.id),
      },
      user_details: {},
    };
    props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
  }
  const browserCategory = () => {
    // this.props.scrollRef.scrollTop = 0;
    setshowBrowseCategory(true);
  };

  const onBack = () => {
    // this.props.scrollRef.scrollTop = 0;
    setshowBrowseCategory(false);
  };
  const browserCategoryList = () => {
    const professionsList = props.professionsList.allProfessions;
    return (
      <UploadContainer.ItemWrapper>
        {professionsList.map(profession => {
          return (
            <UploadContainer.Item
              key={profession.id}
              onClick={() => getSubCategoryList(profession.id)}
              selected={categories.selectedCategory.find(
                cat => cat.id === profession.id,
              )}
              className="categoryItem"
            >
              {profession.title}
            </UploadContainer.Item>
          );
        })}
      </UploadContainer.ItemWrapper>
    );
  };
  const getSubCategoryList = id => {
    let { professions } = props.professionsList;
    professions = professions.filter(profession => profession.id === id);
    professions[0].child.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    setcategories({
      subCategoriesArray: professions[0].child,
      selectedCategory: professions,
    });
  };
  const getSelectedCategoryList = profession => {
    let selctedProfessions;
    if (selectedProfessions.find(cat => cat.id === profession.id)) {
      selctedProfessions = selectedProfessions.filter(
        cat => cat.id !== profession.id,
      );
      setselectedProfessions(selctedProfessions);
    } else if (selectedProfessions.length < 3) {
      selctedProfessions = [...selectedProfessions, profession];
      setselectedProfessions(selctedProfessions);
    }
  };
  const showSubCategoryList = () => {
    return (
      <React.Fragment>
        <div className="right-section">
          <div className="subCategoryHeading">
            Choose the category that describes what you do best:
            <span>{`(${3 -
              selectedProfessions.length} remaining)`}</span>
          </div>
          <Scrollbars className="browse-category-list">
            <UploadContainer.SubItemWrapper>
              {categories.subCategoriesArray.map(profession => {
                return (
                  <UploadContainer.Item
                    key={profession.id}
                    onClick={() => getSelectedCategoryList(profession)}
                    selected={selectedProfessions.find(
                      cat => cat.id === profession.id,
                    )}
                  >
                    {profession.title}
                  </UploadContainer.Item>
                );
              })}
            </UploadContainer.SubItemWrapper>
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  };

  const handleMultiSelect = list => {
    if (list.length < 4) {
      setselectedProfessions(list);
    }
  };
  const handleFocusSelect = () => {};

  const renderContent = () => {
    const { subcategories } = props.professionsList;
    subcategories.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    selectedProfessions.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    let nestedProfessions = props.professionsList.allProfessions;
    nestedProfessions = nestedProfessions.map((item) => {
      const newOption = {};
      newOption.label = item.title;
      newOption.value = item.id;
      if (item.child) {
        newOption.options = item.child.map((childItem) => {
          const childOption = {...childItem};
          childOption.label = childItem.title;
          childOption.value = childItem.id;
          return childOption;
        })
      }
      return newOption;
    })
    return (
      <UploadContainer.Wrapper>
        {showBrowseCategory && (
          <RequestFlowPopup
          modalView
          smallPopup
          // classes={
          //   {
          //     root: 'custom-modal',
          //   }
          // }
        // setScrollRef={this.setScrollRef}
        // disableClose={this.state.disableClose}
        > 
          <UploadContainer.BrowseCategoryWrapper>
            <BackArrow onClick={onBack} />
            <CloseButton onClick={onBack} />
            <UploadContainer.DesktopView>
              <Heading>Browse Categories</Heading>
              <UploadContainer.BrowseCategoryContainer>
                {browserCategoryList()}
                {showSubCategoryList()}
              </UploadContainer.BrowseCategoryContainer>
            </UploadContainer.DesktopView>
            <UploadContainer.MobileView>
              <UploadContainer.Heading>
                Browse categories
              </UploadContainer.Heading>
              <UploadContainer.BrowseCategoryContainer className="mobile-select-category">
                <NestedSelect
                  value={selectedProfessions}
                  options={nestedProfessions}
                  placeholder=""
                  noOptionsMessage='No categories were found.'
                  onChange={handleMultiSelect}
                  onFocus={handleFocusSelect}
                  label={<span>Categorize yourself. <br/>
                    This helps fans find you. (up to 3)</span>}
                />
              </UploadContainer.BrowseCategoryContainer>
            </UploadContainer.MobileView>
          </UploadContainer.BrowseCategoryWrapper>
          </RequestFlowPopup>
        )}
        {!showBrowseCategory && (
          <React.Fragment>
            <UploadContainer.CategoriesWrapper className='fans-want'>
              <MultiSelect
                value={selectedProfessions}
                options={subcategories}
                placeholder=""
                onChange={handleMultiSelect}
                onFocus={handleFocusSelect}
                noOptionsMessage='No categories were found. Try browsing.'
                label={<span>Categorize yourself. <br/>
                This helps fans find you. (up to 3)</span>}
              />
              <UploadContainer.BrowseCategories>
                Not finding one?{' '}
                <UploadContainer.BrowseCategoriesLink
                  onClick={browserCategory}
                >
                  Browse categories
                </UploadContainer.BrowseCategoriesLink>
              </UploadContainer.BrowseCategories>
            </UploadContainer.CategoriesWrapper>
            <UploadContainer.ButtonWrapper className="align-center">
              <PrimaryButton type="submit" onClick={saveIndustry}>
              Save
              </PrimaryButton>
            </UploadContainer.ButtonWrapper>
          </React.Fragment>
        )}
      </UploadContainer.Wrapper>
    );
  };

  return(
    <Layout>
      <BackArrow className="leftArrow" onClick={props.goBack}/>
      <Heading className="title">Industry</Heading>
      <Wrapper>
      {renderContent()}
      </Wrapper>
      {/* <Layout.ButtonWrapper className="align-center">
          <PrimaryButton className='save-button'onClick={saveIndustry} >
            Save             
          </PrimaryButton>
        </Layout.ButtonWrapper> */}

    </Layout>
  );
}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
  professionsList: state.professionsList,
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  };
}

const IndustryRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Industry);
export { IndustryRoot };