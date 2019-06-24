import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../styled';
import { Wrap } from './styled';

const ProfilePhoto = props => {
  return (
    <Container>
      <Wrap>
        <h2
          className="sub-head"
          data-web={props.webHead}
          data-mob={props.mobHead}
        >
          {''}
        </h2>
      </Wrap>
    </Container>
  );
};

ProfilePhoto.propTypes = {
  webHead: PropTypes.string,
  mobHead: PropTypes.string,
};

ProfilePhoto.defaultProps = {
  webHead: '',
  mobHead: '',
};

export default ProfilePhoto;
