import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, Loading } from 'styles/CommonStyled';

const LoaderProgress = props => {
  const getLoader = () => {
    if (props.progress.loader) {
      return <Progress variant="static" value={props.progress.value} />;
    }
    return <Progress />;
  };
  return (
    <React.Fragment>
      {(props.loader || props.progress.loader) && (
        <Loading>{getLoader()}</Loading>
      )}
    </React.Fragment>
  );
};

LoaderProgress.propTypes = {
  loader: PropTypes.bool.isRequired,
  progress: PropTypes.object.isRequired,
};

const mapState = state => ({
  loader: state.commonReducer.loader,
  progress: state.commonReducer.progress,
});

export default connect(
  mapState,
  null,
)(LoaderProgress);
