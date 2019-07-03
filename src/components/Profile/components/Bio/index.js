import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Layout, Heading, Wrapper } from  './styled';
import { BackArrow } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { TextInput } from '../../../TextField';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings'; 

const Bio = props => {

  const [description, setdescription] = useState(props.userDetails.settings_celebrityDetails.description ? props.userDetails.settings_celebrityDetails.description : '');

  const onTextChange = (event) => {
    setdescription(event.target.value);
  }

  const saveBio = () => {
    const finalUserDetails = {
      celebrity_details: {
        description,
      },
      user_details: {},
    };
    props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
  }
  return(
    <Layout>
      <BackArrow className="leftArrow" onClick={props.goBack}/>
      <Heading>Profile Bio</Heading>
      <Wrapper>
        <TextInput
          placeholder="Make yourself sound cooler than you really are…"
          multiline
          InputProps={{
            disableUnderline: true,
            classes: {
              root: 'input-root',
              multiline: 'input-textarea',
            }
          }}
          value={description}
          onChange={onTextChange}
      />
      </Wrapper>
      <Layout.ButtonWrapper className="align-center">
          <PrimaryButton className='save-button'onClick={saveBio} >
            Save             
          </PrimaryButton>
        </Layout.ButtonWrapper>

    </Layout>
  );
}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  };
}

const BioRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bio);
export { BioRoot };