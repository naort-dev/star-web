import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from 'components/PrimaryButton';
import { FlexCenter, CloseButton } from 'styles/CommonStyled';
import { Layout, Content } from './styled';

const SuccessScreen = props => {
  return (
    <Layout className="content-wrapper">
      <CloseButton onClick={props.closeHandler} className="closeBtn" />
      <Scrollbars
        className="successScroll"
        renderView={prop => <div {...prop} className="scrollRenderView" />}
      >
        <FlexCenter>
          <span className="successImg" />
        </FlexCenter>
        <Content>
          {props.customTitle}
          <h2 className="highFive">{props.title}</h2>
          {props.customMsg}
          <h1 className="orderSuccess">{props.successMsg}</h1>
          {props.customNote}
          <p className="note">{props.note}</p>
          {props.customButton}
          {!props.customButton && (
            <div className="align-center">
              <Button className="browseBtn" onClick={props.buttonHandler}>
                {props.btnLabel}
              </Button>
            </div>
          )}
          {props.footerContent}
        </Content>
      </Scrollbars>
    </Layout>
  );
};

SuccessScreen.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  buttonHandler: PropTypes.object.isRequired,
  title: PropTypes.string,
  successMsg: PropTypes.string,
  note: PropTypes.string,
  btnLabel: PropTypes.string,
  customTitle: PropTypes.node,
  customMsg: PropTypes.node,
  customNote: PropTypes.node,
  customButton: PropTypes.node,
  footerContent: PropTypes.node,
};

SuccessScreen.defaultProps = {
  title: '',
  successMsg: '',
  note: '',
  btnLabel: '',
  customTitle: '',
  customMsg: '',
  customNote: '',
  customButton: '',
  footerContent: '',
};

export default withRouter(SuccessScreen);
