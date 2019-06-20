import React from 'react';
import PropTypes from 'prop-types';

import SubHeader from '../../../SubHeader';
import { Layout } from '../../../../pages/Bookings/components/OpenBookings/components/RespondAction/Success/styled';

const NameAndPhoto = props => {
  const goBack = () => {};
  console.log('asdasd')
  return (
    <Layout>
      <SubHeader className="subheader" heading="fhfhfghfh" onClick={goBack} />
    </Layout> 

  );

}

export { NameAndPhoto };