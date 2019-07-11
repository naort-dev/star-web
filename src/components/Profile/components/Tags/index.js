import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEmpty } from 'lodash';

import { Layout, Heading, Wrapper, UploadContainer } from  './styled';
import { BackArrow, CloseButton } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import MultiSelect from '../../../../components/MultiSelect';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings';
import { fetchTagsList, setNewTag } from '../../../../services/getTagsList';
import NestedSelect from '../../../../components/NestedSelect'; 
import RequestFlowPopup from '../../../../components/RequestFlowPopup';

const Tags = props => {

  const [selectedTags, setselectedTags] = useState([]);
  const [tagList, settagList] = useState([]);
  const [createTag, setCreateTag] = useState('');
  useEffect(()=> {
    if(props.userDetails.settings_celebrityDetails.tags){
      const existingTags = props.userDetails.settings_celebrityDetails.tags.map((tag) =>({
        label: tag.name,
        value:tag.id,
      }));
      setselectedTags(existingTags);
    }
    
  },[props.userDetails.settings_celebrityDetails.tags]);

  const setTag= async (newTag) => {
    const result = await setNewTag(newTag);
    setCreateTag('');
    result.data.tags.forEach((tag) =>{
      setselectedTags([
        ...selectedTags,
        { label: tag.name,
          value : tag.id,
        }
      ]);
    });
   
  };

  const ListAdornment = (tagName) => {
    return (
      <Wrapper.Adornment  onClick={() => setTag(createTag)}>Create <div className="tagName">{tagName} </div> </Wrapper.Adornment >
    );
  };
  
  const saveTags = () => {
    const finalUserDetails = {
      celebrity_details: {
        tags: selectedTags.map(selectedTag => selectedTag.value),
      },
      user_details: {},
    };
    props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
  }

  const onBack = () => {
    
  };
  const handleOptionPillClick = (chosenTag) => {
    setselectedTags(
      chosenTag,
    );
  }

  const handleMultiSelect = async (list) => {
    let isExistingTag = false;
    if (list) {
    if(list.length > 2){
      const tagsList = await fetchTagsList(list, props.configData);
      tagsList.map((tag) => {
        if(tag.label.toLowerCase()=== list.toLowerCase()) {
          isExistingTag = true;
        }
      });
      settagList(tagsList);
      if(!isExistingTag) {
        setCreateTag(list);
      } else {
        setCreateTag('');
      }
    }
  }

  };
  const handleFocusSelect = () => {};

  const renderContent = () => {
    return (
      <React.Fragment>
        <UploadContainer.CategoriesWrapper className='fans-want'>
          <MultiSelect
            value={selectedTags}
            options={tagList}
            placeholder=""
            MenuListAdornment={ createTag ? ListAdornment(createTag): ''}
            onChange={handleOptionPillClick}
            onInputChange={handleMultiSelect}
            onFocus={handleFocusSelect}
            noOptionsMessage='No Tags were found.'
          />
        </UploadContainer.CategoriesWrapper>
        <UploadContainer.ButtonWrapper className="align-center">
          <PrimaryButton type="submit" onClick={saveTags}>
          Save
          </PrimaryButton>
        </UploadContainer.ButtonWrapper>
      </React.Fragment>
        );
      };

    return(
    <Layout>
      <BackArrow className="leftArrow" onClick={props.goBack}/>
      <Heading className="title">Tags</Heading>
      <Wrapper>
      <Wrapper.SubTitle>
          { props.subTitle }
      </Wrapper.SubTitle>
      {renderContent()}
      </Wrapper>   
    </Layout>
  );
}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
  professionsList: state.professionsList,
  configData: state.config.data,
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  };
}

const TagsRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tags);
export { TagsRoot };
