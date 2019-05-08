import React from 'react';
import PropTypes from 'prop-types';
import { Container, Head } from './Skip.styles';
import { BackArrow, FlexCenter } from '../../../../styles/CommonStyled';
import Button from '../../../../components/PrimaryButton';

const Skip = props => {
  return (
    <Container>
      <BackArrow
        onClick={() => props.onBack(props.switched)}
        className="leftArrow"
      />
      <FlexCenter className="colAlign content">
        <Head className="heading">Are you sure you want to skip?</Head>
        <p className="note">
          While you can skip this part, we don’t recommend it. Your welcome
          video is key in helping fans book you for paid videos.
        </p>
        <FlexCenter className="colAlign">
          <Button className="button" onClick={() => props.onBack(true)}>
            You talked me into it, let me fix my hair
          </Button>
          <Button className="button whiteBtn" onClick={() => props.changeStep(props.currentStep + 1)}>
            Skip for now but I will be back!
          </Button>
        </FlexCenter>
      </FlexCenter>
    </Container>
  );
};

Skip.propTypes = {
  onBack: PropTypes.func.isRequired,
  switched: PropTypes.bool,
};

Skip.defaultProps = {
  switched: false,
};

export default Skip;
