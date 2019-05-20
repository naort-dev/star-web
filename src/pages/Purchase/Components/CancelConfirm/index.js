import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow, FlexCenter, CloseButton } from 'styles/CommonStyled';
import Button from 'components/PrimaryButton';
import { Layout, Container, Head } from './styled';

const CancelConfirm = props => {
  return (
    <Layout>
      <Container>
        <BackArrow className="leftArrow" onClick={props.modalClose} />
        <CloseButton className="closeBtn" onClick={props.modalClose} />
        <FlexCenter className="colAlign content">
          <Head className="heading">
            Are you sure you want to cancel your booking?
          </Head>
          <FlexCenter className="colAlign">
            <Button className="whiteBtn" onClick={props.requestFLowClose}>
              I’ll come back later
            </Button>
            <Button className="whiteBtn" onClick={props.modalClose}>
              {`I need ${props.starNM} in my life, continue my booking`}
            </Button>
          </FlexCenter>
        </FlexCenter>
      </Container>
    </Layout>
  );
};

CancelConfirm.propTypes = {
  modalClose: PropTypes.func.isRequired,
  requestFLowClose: PropTypes.func.isRequired,
  starNM: PropTypes.string.isRequired,
};

export default CancelConfirm;
