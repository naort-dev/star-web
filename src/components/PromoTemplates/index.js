import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import { Layout } from './styled';

const PromoTemplate = props => {
  return (
    <Layout
      className="template-card"
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(props.template),
      }}
    />
  );
};

PromoTemplate.propTypes = {};
export default PromoTemplate;
