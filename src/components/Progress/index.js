import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, Loading } from 'styles/CommonStyled';

const LoaderProgress = props => {
  return (
    <React.Fragment>
      {props.loader && (
        <Loading>
          <Progress />
        </Loading>
      )}
    </React.Fragment>
  );
};

LoaderProgress.propTypes = {
  loader: PropTypes.bool.isRequired,
};

const mapState = state => ({
  loader: state.commonReducer.loader,
});

export default connect(
  mapState,
  null,
)(LoaderProgress);
