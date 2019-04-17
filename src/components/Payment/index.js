import React from 'react';
import { Layout } from './styled';
import UserCard from './UserCard';

const Payment = (props) => {
  return (
    <Layout>
      <UserCard {...props} />
    </Layout>
  );
};

export default Payment;
