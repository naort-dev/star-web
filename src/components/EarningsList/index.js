import React, { Fragment } from 'react';
import EarningsListStyled from './styled';
import moment from 'moment';
import Dollar from '../Dollar';

const EarningsList = (props) => {
  const renderList = (item, index) => (
    <EarningsListStyled.Content key={`2_${index}`}>
      <EarningsListStyled.ListItem amount><Dollar amount={parseFloat(item.amount)} size={14} color="#FF6C58" /></EarningsListStyled.ListItem>
      <EarningsListStyled.ListItem light tabletView>{item.starsona.occasion}</EarningsListStyled.ListItem>
      <EarningsListStyled.ListDescription large light tabletView title={item.starsona.booking_title}>{item.starsona.booking_title}</EarningsListStyled.ListDescription>
      <EarningsListStyled.ListItem light desktopView>{item.starsona.fan}</EarningsListStyled.ListItem>
      <EarningsListStyled.ListItem light>{item.id}</EarningsListStyled.ListItem>
      <EarningsListStyled.ListItem large light>{moment(item.created_date).format('LL')}</EarningsListStyled.ListItem>
      <EarningsListStyled.ListItem light>{item.payout_status}</EarningsListStyled.ListItem>
    </EarningsListStyled.Content>
  );

  const renderMobileList = (item, index) => (
    <EarningsListStyled.ContainerMobile key={`1_${index}`}>
      {index !== 0 && <EarningsListStyled.MobileSeparator />}
      <EarningsListStyled.ContentMobile key={index}>
        <EarningsListStyled.ListItemMobile light>{moment(item.created_date).format('LL')}</EarningsListStyled.ListItemMobile>
        <EarningsListStyled.DataRowWrapperMobile>
          <EarningsListStyled.ListItemMobile>{item.starsona.fan} · {item.starsona.occasion}</EarningsListStyled.ListItemMobile>
          <Dollar amount={parseFloat(item.amount)} size={15} color="#b5b5b5" />
        </EarningsListStyled.DataRowWrapperMobile>
      </EarningsListStyled.ContentMobile>
    </EarningsListStyled.ContainerMobile>
  );

  return (
    <Fragment key={`k_${props.index}`}>
      {renderMobileList(props.item, props.index)}
      {renderList(props.item, props.index)}
    </Fragment>

  );
};

export default EarningsList;
