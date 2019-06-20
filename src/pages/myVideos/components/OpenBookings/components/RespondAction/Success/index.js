import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from 'components/PrimaryButton';
import { FlexCenter, CloseButton } from 'styles/CommonStyled';
import { Layout, Content, Message } from './styled';

const SuccessScreen = props => {
  const { stargramto } = props.bookItem.request_details;
  const getName = () => {
    if (!isEmpty(stargramto)) {
      return <span className="bold-message">for {stargramto}</span>;
    }
    return null;
  };
  const getMessage = () => {
    if (props.bookItem.request_type === 1) {
      return (
        <Message>
          You completed a{' '}
          <span className="bold-message">{props.bookItem.occasion}</span>{' '}
          shoutout {getName()}
        </Message>
      );
    } else if (props.bookItem.request_type === 2) {
      return (
        <Message>
          You completed a{' '}
          <span className="bold-message">{props.bookItem.occasion}</span>{' '}
          announcement {getName()}
        </Message>
      );
    }
    return <Message>You have completed the answer</Message>;
  };
  return (
    <Layout className="content-wrapper">
      <CloseButton onClick={props.closeHandler} className="closeBtn" />
      <Scrollbars className="successScroll">
        <FlexCenter>
          <span className="successImg" />
        </FlexCenter>
        <Content>
          <h2 className="highFive">High Five!</h2>
          {getMessage()}
          <p className="note">
            Your video is on its way. We will let you know when its delivered
            and hopefully you’ll get some good feedback
          </p>
          <div className="align-center">
            <Button className="button-next" onClick={props.nextRequest}>
              Next request
            </Button>
          </div>
        </Content>
      </Scrollbars>
    </Layout>
  );
};

SuccessScreen.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  nextRequest: PropTypes.func.isRequired,
  bookItem: PropTypes.object.isRequired,
};

export default withRouter(SuccessScreen);
