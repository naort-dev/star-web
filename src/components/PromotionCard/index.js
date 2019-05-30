import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from './styled';

const Promotion = props => {
  return (
    <Layout>
      <section className="header-sec">
        <h2 className="promotion-head">Keep Your Fans Informed!</h2>
        <p className="note-sec">
          <span className="share-link">Share your profile</span> on your social
          media and keep those bookings coming.{' '}
        </p>
      </section>
    </Layout>
  );
};

Promotion.propTypes = {};

export default Promotion;
