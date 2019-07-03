import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import { PopupHeading } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';
import { TextInput } from '../TextField';
import { contactSupport } from '../../services';
import { updateToast, loaderAction } from '../../store/shared/actions/commonActions';
import { toggleContactSupport } from '../../store/shared/actions/toggleModals';
import SupportStyled from './styled';

const SupportModal = (props) => {

  const [supportOption, setOption] = useState({});
  const [supportText, updateSupportText] = useState('');

  const onTextChange = (event) => {
    updateSupportText(event.target.value);
  }
    
  const updateSupportOption = (option) => {
    setOption(option);
  }

  const onSubmit = async () => {
    props.loaderAction(true);
    try {
      await contactSupport(supportOption.value, supportText);
      props.toggleContactSupport(false)();
      props.loaderAction(false);
      props.updateToast({
        value: true,
        message: 'Message sent',
        variant: 'success',
      })
    } catch(exception) {
      props.loaderAction(false);
      props.updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      })
    }
  }

  return (
    <RequestFlowPopup
      classes={{ root: 'alternate-modal-root' }}
      closePopUp={props.toggleContactSupport(false)}
    >
      <SupportStyled>
        <PopupHeading>
          Help us, help you.
        </PopupHeading>
          <Dropdown
            rootClass="drop-down"
            selected={supportOption}
            secondary
            options={props.config.supportTopics}
            labelKey="label"
            valueKey="value"
            onChange={updateSupportOption}
          />
          <TextInput
            placeholder="What can we help you with? We probably won’t respond with a personalized video, but we will respond."
            multiline
            InputProps={{
              disableUnderline: true,
              classes: {
                root: 'input-root',
                multiline: 'input-textarea',
              }
            }}
            value={supportText}
            onChange={onTextChange}
          />
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      </SupportStyled>
    </RequestFlowPopup>
  );
}

SupportModal.propTypes = {
  config: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  config: state.config.data,
  updateBooking: state.modals.updateBookingModal,
})

const mapDispatchToProps = dispatch => ({
  updateToast: errorObject => dispatch(updateToast(errorObject)),
  loaderAction: state => dispatch(loaderAction(state)),
  toggleContactSupport: (state, requestId) => () => dispatch(toggleContactSupport(state, requestId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportModal);
