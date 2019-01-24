import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../Popup';
import ConfirmStyled from './styled';

const ConfirmPopup = props => (
  <Popup
    smallPopup
    closePopUp={props.closePopup}
  >
    <ConfirmStyled>
      <ConfirmStyled.PopupHeader>{props.heading}</ConfirmStyled.PopupHeader>
      <ConfirmStyled.ConfirmButtonWrapper>
        <ConfirmStyled.ConfirmButton alternate onClick={props.onConfirm}>
          Yes
        </ConfirmStyled.ConfirmButton>
        <ConfirmStyled.ConfirmButton onClick={props.closePopup}>No</ConfirmStyled.ConfirmButton>
      </ConfirmStyled.ConfirmButtonWrapper>
    </ConfirmStyled>
  </Popup>
);

ConfirmPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};

export default ConfirmPopup;
