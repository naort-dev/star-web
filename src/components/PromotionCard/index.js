import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
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
        <span className="promo-template" />
      </section>
      <span className="share-text">Share your profile!</span>
      <section className="social-wrap">
        <span className="icon-wrap">
          <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
          <span className="social-name">Facebook</span>
        </span>
        <span className="icon-wrap">
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <span className="social-name">Twitter</span>
        </span>
        <span className="icon-wrap">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          <span className="social-name">Instagram</span>
        </span>
      </section>
    </Layout>
  );
};

Promotion.propTypes = {};

export default Promotion;
