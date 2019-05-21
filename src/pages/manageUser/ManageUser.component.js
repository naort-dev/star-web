import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ManageStyled from './styled';

const ManageUser = (props) => {
  return (
    <ManageStyled>
      <Header desktopSearch/>
        <ManageStyled.Container>
          <Sidebar />
          {
            props.isStar ? 'Star user' : 'Fan user'
          }
        </ManageStyled.Container>
    </ManageStyled>
  );
}

ManageUser.propTypes = {
  isStar: PropTypes.bool.isRequired,
}

export default ManageUser;
