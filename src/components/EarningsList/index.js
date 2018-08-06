import React from 'react';
import EarningsListStyled from './styled';
import moment from 'moment';

const EarningsList = (props) => {
  return (
    <EarningsListStyled>
      <EarningsListStyled.Header>
        <EarningsListStyled.ListItem>Revenue</EarningsListStyled.ListItem>
        <EarningsListStyled.ListItem tabletView>VideoType</EarningsListStyled.ListItem>
        <EarningsListStyled.ListItem tabletView>Description</EarningsListStyled.ListItem>
        <EarningsListStyled.ListItem desktopView>Customer</EarningsListStyled.ListItem>
        <EarningsListStyled.ListItem>Order #</EarningsListStyled.ListItem>
        <EarningsListStyled.ListItem>Date</EarningsListStyled.ListItem>
      </EarningsListStyled.Header>
      <EarningsListStyled.ContentWrapper>
        {
            props.dataList.map((item, index) => {
              return (
                <EarningsListStyled.Content key={index}>
                  <EarningsListStyled.ListItem amount>${item.amount}</EarningsListStyled.ListItem>
                  <EarningsListStyled.ListItem light tabletView>{item.starsona.occasion}</EarningsListStyled.ListItem>
                  <EarningsListStyled.ListItem light tabletView>sadsad</EarningsListStyled.ListItem>
                  <EarningsListStyled.ListItem light desktopView>{item.starsona.fan}</EarningsListStyled.ListItem>
                  <EarningsListStyled.ListItem light>{item.id}</EarningsListStyled.ListItem>
                  <EarningsListStyled.ListItem light>{moment(item.created_date).format('LL')}</EarningsListStyled.ListItem>
                </EarningsListStyled.Content>
              );
            })
          }
      </EarningsListStyled.ContentWrapper>
    </EarningsListStyled>
  );
};

export default EarningsList;
