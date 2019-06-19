import React, { useState } from 'react';
import {connect } from 'react-redux';
import { PopupHeading } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';
import { TextInput } from '../TextField';
import { toggleContactSupport } from '../../store/shared/actions/toggleModals';
import SupportStyled from './styled';

const SupportModal = (props) => {

  const [supportText, updateSupportText] = useState('');

  const onTextChange = (event) => {
    updateSupportText(event.target.value);
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
          {/* <Dropdown
            rootClass="drop-down"
            selected={reason}
            secondary
            options={declineReasons}
            labelKey="label"
            valueKey="value"
            onChange={updateReason}
          /> */}
          <TextInput
            InputProps={{
              classes: {
                root: 'input-root',
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
