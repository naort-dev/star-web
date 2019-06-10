import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import { options } from './constants';
import { celebOpenStatusList, celebCompletedStatusList } from '../../constants/requestStatusList';
import { parseQueryString } from '../../utils/dataformatter';
import {  } from '../../styles/CommonStyled';
import BookingsStyled from './styled';

const Bookings = (props) => {

  const [dropValue , setDropValue] = useState({
    title: 'All',
    id: 'all',
  });
  
  const customData = {
    id: "9aAnrBbv",
    fan: "Dark Knight",
    celebrity: "Star Lord",
    occasion: "Anniversary",
    request_details: {
      stargramto: "asdasd",
      stargramfrom: "Dark Knight",
      relationship: {
        id: 19,
        title: "Coworker"
      },
      show_relationship: true,
      specifically_for: "",
      from_where: "",
      important_info: "",
      date: "2019-03-13T06:59:57.8760Z",
      event_title: "",
      event_guest_honor: "asdasd"
    },
    from_audio_file: null,
    to_audio_file: null,
    request_status: 6,
    created_date: "2019-03-15T05:19:15.270993Z",
    request_video: [
      {
        video_status: 1,
        status: true,
        s3_video_url:
          "https://app.staging.starsona.com/private/video/rb2kqjdW.mp4?v=2.1",
        s3_thumbnail_url:
          "https://s3.amazonaws.com/starsona-stb-usea1/videos/starsona_thumb/FILE_1552626010KFFZGTGU_sg_thumbnail.jpg",
        video_url: "staging.starsona.com/video/rb2kqjdW/",
        video_id: "rb2kqjdW",
        read_status: false,
        width: 360,
        height: 480,
        comments_count: 15,
        fan_view_count: 0
      }
    ],
    comment: null,
    avatar_photo: {
      id: "9av8AXdG",
      image_url:
        "https://s3.amazonaws.com/starsona-stb-usea1/images/profile/FILE_1553779137KUYSJCQQ.jpeg",
      thumbnail_url:
        "https://s3.amazonaws.com/starsona-stb-usea1/images/profile/thumbnail_FILE_1553779137KUYSJCQQ.jpeg",
      photo: "FILE_1553779137KUYSJCQQ.jpeg",
      thumbnail: "thumbnail_FILE_1553779137KUYSJCQQ.jpeg",
      medium_thumbnail: null,
      medium_thumbnail_url: null
    },
    public_request: true,
    professions: [
      {
        id: 9,
        title: "Announcer",
        show_parent: false,
        parent: "Sports"
      },
      {
        id: 30,
        title: "Ninja / Spartan / Gladiator",
        show_parent: false,
        parent: "Sports"
      },
      {
        id: 101,
        title: "Comedian",
        show_parent: false,
        parent: "Comedians"
      }
    ],
    editable: false,
    fan_rating: null,
    celebrity_id: "l9avWnbG",
    occasion_type: 5,
    charity: "Blood Hospital",
    booking_id: "9aAnrBbv",
    order_details: {
      order: "OR-12975",
      amount: 200.0
    },
    fan_photo: {
      id: "mepk1pdM",
      image_url:
        "https://s3.amazonaws.com/starsona-stb-usea1/images/profile/FILE_1551274282XWDEVAR6.jpeg",
      thumbnail_url:
        "https://s3.amazonaws.com/starsona-stb-usea1/images/profile/thumbnail_FILE_1551274282XWDEVAR6.jpeg",
      photo: "FILE_1551274282XWDEVAR6.jpeg",
      thumbnail: "thumbnail_FILE_1551274282XWDEVAR6.jpeg",
      medium_thumbnail: null,
      medium_thumbnail_url: null
    },
    occasion_id: 1,
    request_type: 1,
    booking_title: "Anniversary video shout-out from Star Lord"
  };

  const fetchList = (type) => {
    switch (type) {
      case 'all':
        props.fetchBookingsList(0, true, 'all');
        break;
      case 'open':
        props.fetchBookingsList(0, true, celebOpenStatusList);
        break;
      case 'completed':
        props.fetchBookingsList(0, true, celebCompletedStatusList);
        break;
      case 'cancelled':
        props.fetchBookingsList(0, true, [6]);
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    const queryString = parseQueryString(props.location.search);
    const newDropValue = options.find(option => option.id === queryString.type);
    if (newDropValue && newDropValue.id !== 'all') {
      setDropValue(newDropValue);
      fetchList(newDropValue.id);
    } else {
      setDropValue({
        title: 'All',
        id: 'all',
      })
      fetchList('open');
    }
    props.toggleBookingModal(true, customData, true);
  }, [])

  const setRequestType = (option) => () => {
    setDropValue(option)
  }

  const handleCategoryChange = (option) => {
    setDropValue(option)
    if (option.id === 'all') {
      fetchList('open'); 
    } else {
      fetchList(option.id); 
    }
  }

  const onBackClick = () => {
    props.history.goBack();
  }

  const onOpenClick = bookingId => () => {
    props.history.push(`/manage/bookings?type=open&selected=${bookingId}`)
  }

  return (
    <BookingsStyled>
      <BackArrow className="arrow" onClick={onBackClick} />
      <BookingsStyled.Header>My Bookings</BookingsStyled.Header>
      {
        dropValue.id === 'all'&&
          <AllBookings
            bookingsList={props.bookingsList}
            dropValue={dropValue}
            config={props.config}
            handleCategoryChange={handleCategoryChange}
            onOpenClick={onOpenClick}
            setRequestType={setRequestType}
          />
      }
      {
        dropValue.id === 'open' && <OpenBookings dropValue={dropValue} handleCategoryChange={handleCategoryChange} />
      }
      {
        dropValue.id === 'completed' &&
          <CompletedBookings
            bookingsList={props.bookingsList}
            dropValue={dropValue}
            handleCategoryChange={handleCategoryChange}
          />
      }
    </BookingsStyled>
  )
}

Bookings.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
}

export default Bookings;
