import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from 'components/PrimaryButton';
import { FlexCenter, CloseButton } from 'styles/CommonStyled';
import { Layout, Content } from './styled';

const SuccessScreen = props => {
  const closeRequestFlow = () => {
    props.history.push('/browse-stars');
    props.closeHandler();
  };

  return (
    <Layout className="content-wrapper">
      <CloseButton onClick={props.closeHandler} className="closeBtn" />
      <Scrollbars className="successScroll"
       renderView={prop => (
        <div {...prop} className="scrollRenderView" />
      )}
      >
        <FlexCenter>
          <span className="successImg" />
        </FlexCenter>
        <Content>
          <h2 className="highFive">High Five!</h2>
          <h1 className="orderSuccess">Your order is complete!</h1>
          <p className="note">
            Now sit back, relax, and get ready to hear from your star. You’ll be
            notified when your video is complete. Don’t forget! — if your video
            is a surprise for someone else, record their reaction to share with
            us and the Star! We all love seeing fan reactions.
          </p>
          <div className="align-center">
            <Button className="browseBtn" onClick={closeRequestFlow}>
              Browse Stars
            </Button>
          </div>
        </Content>
      </Scrollbars>
    </Layout>
  );
};

SuccessScreen.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SuccessScreen);
