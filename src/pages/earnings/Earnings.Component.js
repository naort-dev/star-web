import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SubHeader from 'components/SubHeader';
import Loader from 'components/Loader';
import StarCard from 'components/StarCard';
import { Layout, Wrapper } from './styled';

const Earnings = props => {
  const [loader, setLoader] = useState(false);
  const goBack = () => {
    props.history.push('/manage');
  };
  const getDataSuccess = () => {
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    props.getDashboardData(getDataSuccess);
  }, []);

  return (
    <Layout>
      <SubHeader heading="Earnings" className="top-heading" onClick={goBack} />
      <Wrapper>
        <section className="middle-section">
          {loader && <Loader class="custom-loader" />}
          <StarCard data={props.dashBoardData} />
        </section>
      </Wrapper>
    </Layout>
  );
};

Earnings.propTypes = {
  history: PropTypes.object.isRequired,
  getDashboardData: PropTypes.func.isRequired,
  dashBoardData: PropTypes.object.isRequired,
};

export default Earnings;
