import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Content } from './styled';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter, CloseButton } from '../../../../styles/CommonStyled';

const SuccessScreen = props => {
  return (
    <Layout>
      <CloseButton onClick={props.closeHandler} className="closeBtn" />
      <Scrollbars className="successScroll">
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
          <Button className="browseBtn">Browse Stars</Button>
        </Content>
      </Scrollbars>
    </Layout>
  );
};

SuccessScreen.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default SuccessScreen;
