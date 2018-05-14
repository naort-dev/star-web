import React from 'react';
import PropTypes from 'prop-types';
import { Mask } from './styled';

import { Placeholder } from '../Placeholder';

export const ComponentLoading = ({
  error,
  timedOut,
  pastDelay,
}) => {
  if (error) {
    return (
      <Mask>
        <Placeholder message="Failed to load page! Try refreshing." status="error" />
      </Mask>
    );
  } else if (timedOut) {
    return (
      <Mask>
        <Placeholder message="Still loading the page..." />
      </Mask>
    );
  } else if (pastDelay) {
    return (
      <Mask>
        <Placeholder message="Loading the page..." />
      </Mask>
    );
  }

  return null;
};

ComponentLoading.displayName = 'ComponentLoading';

ComponentLoading.defaultProps = {
  error: false,
  timedOut: false,
  pastDelay: true,
};

ComponentLoading.propTypes = {
  error: PropTypes.any,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
};
