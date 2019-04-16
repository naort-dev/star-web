import React, { Component } from 'react';
import { Layout } from './styled';
import UserCard from './UserCard';

class Payment extends Component {
  render() {
    return (
      <Layout>
        <UserCard />
      </Layout>
    );
  }
}

export default Payment;
