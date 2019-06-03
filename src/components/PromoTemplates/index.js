import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from './styled';

const PromoTemplate = props => {
  return (
    <Layout
      className="template-card"
      dangerouslySetInnerHTML={{
        __html: props.template,
      }}
    />
  );
};

PromoTemplate.propTypes = {};
export default PromoTemplate;
