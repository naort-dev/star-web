import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PlaceholderWrap = styled.div`
  margin: 2rem;
`;
const Message = styled.div`
  padding: 2rem;
  width: 100%;
  font-size: 1.8rem;
  line-height: 3rem;
  text-align: center;
  color: '#f00'
  box-sizing: border-box;
`;
const ActionWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Action = styled.div`
  margin: 0 1rem;
`;

export const Placeholder = ({
  status,
  message,
  actions,
}) => (
  <PlaceholderWrap>
    <Message status={status}>{message}</Message>
    {
      actions.map((action, index) => <ActionWrap key={`index-${index * 2}`}><Action>{action}</Action></ActionWrap>)
    }
  </PlaceholderWrap>
);

Placeholder.displayName = 'Placeholder';

Placeholder.defaultProps = {
  status: 'default',
  actions: [],
};

Placeholder.propTypes = {
  status: PropTypes.oneOf([
    'success',
    'error',
    'default',
  ]),
  message: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.element),
};
