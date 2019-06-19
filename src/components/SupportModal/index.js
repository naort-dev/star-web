import React, { useState } from 'react';
import {connect } from 'react-redux';
import { PopupHeading } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';
import { TextInput } from '../TextField';
import { supportOptions } from '../../constants';
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
            options={supportOptions}
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
        <PrimaryButton>Submit</PrimaryButton>
      </SupportStyled>
    </RequestFlowPopup>
  );
}

const mapStateToProps = state => ({
  config: state.config.data,
  updateBooking: state.modals.updateBookingModal,
})

const mapDispatchToProps = dispatch => ({
  toggleContactSupport: (state, requestId) => () => dispatch(toggleContactSupport(state, requestId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportModal);
