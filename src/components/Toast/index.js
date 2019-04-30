import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/pro-regular-svg-icons';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Layout } from './styled';
import { updateToast } from '../../store/shared/actions/commonActions';

const variantIcon = {
  success: faCheckCircle,
  warning: faExclamationTriangle,
  error: faExclamationCircle,
  info: faInfoCircle,
};

function CustomToast(props) {
  return (
    <SnackbarContent
      className={props.variant}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar">
          <FontAwesomeIcon icon={variantIcon[props.variant]} className="icon" />
          <span className="message">{props.message}</span>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={props.onClose}
          className="closeBtn"
        >
          <FontAwesomeIcon icon={faTimes} className="icon" />
        </IconButton>,
      ]}
    />
  );
}

CustomToast.propTypes = {
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

const Toast = props => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.updateToast({
      value: false,
      message: '',
      variant: '',
    });
  };

  return (
    <Layout>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.toastObj.value}
        autoHideDuration={6000}
        onClose={handleClose}
        className="toast-bar"
      >
        {props.toastObj.value ? (
          <CustomToast
            onClose={handleClose}
            variant={props.toastObj.variant}
            message={props.toastObj.message}
          />
        ) : null}
      </Snackbar>
    </Layout>
  );
};

Toast.propTypes = {
  updateToast: PropTypes.func.isRequired,
  toastObj: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateToast: toastObj => {
      dispatch(updateToast(toastObj));
    },
  };
}
export default connect(
  state => {
    return { toastObj: state.commonReducer.toastObj };
  },
  mapDispatchToProps,
)(Toast);
