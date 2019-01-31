import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Page404Styled from './styled';

const Page404 = props => (
  <Page404Styled>
    <Header
      disableMenu
      history={props.history}
    />
    <Page404Styled.Content>
      The page you are looking for does not exist!
    </Page404Styled.Content>
  </Page404Styled>
);

Page404.propTypes = {
  history: PropTypes.object.isRequired,
};

Page404.displayName = 'Page404';
export default Page404;
