import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import fetchStarDetails from '../../pages/starProfile/actions';
import { toggleQuickView } from '../../store/shared/actions/toggleModals';
import { pipeSeparator, getStarName } from '../../utils/dataToStringFormatter';
import RequestFlowPopup from '../RequestFlowPopup';
import StarDrawer from '../StarDrawer';
import PrimaryButton from '../PrimaryButton';
import VideoRender from '../VideoRender';
import QuickViewStyled from './styled';

const QuickViewModal = (props) => {
  const { paleSkyBlue } = props.theme;
  const starData = [{
    size: '105px',
    horizontal: '85%',
    vertical: '60%',
    rotation: '15deg',
    color: paleSkyBlue,
  }];

  useEffect(() => {
    if (props.quickViewModal.data) {
      props.fetchStarDetails(props.quickViewModal.data);
    }
  }, []);

  return (
    <RequestFlowPopup
      dotsCount={0}
      selectedDot={0}
      closePopUp={props.toggleQuickView(false)}
      smallPopup
    >
      <QuickViewStyled>
        <QuickViewStyled.VideoContainer>
          <VideoRender
            variableWidth
            variableHeight
            noBorder
            videoSrc={props.celebDetails.profile_video}
            cover="assets/images/default-cover.jpg"
          />
        </QuickViewStyled.VideoContainer>
        <QuickViewStyled.Content>
          <QuickViewStyled.Categories>
            { pipeSeparator(props.celebDetails.profession_details, 'title') }
          </QuickViewStyled.Categories>
          <QuickViewStyled.StarName>
            { getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name) }
          </QuickViewStyled.StarName>
          <QuickViewStyled.SubHeader>Average Response Time</QuickViewStyled.SubHeader>
          <QuickViewStyled.SubDescription>2 Days</QuickViewStyled.SubDescription>
          <QuickViewStyled.HeartIcon>
            <FontAwesomeIcon icon={faHeart} />
          </QuickViewStyled.HeartIcon>
          <QuickViewStyled.MiniDescription onClick={props.toggleQuickView(false)} to="/browse-stars">Read full profile</QuickViewStyled.MiniDescription>
        </QuickViewStyled.Content>
      </QuickViewStyled>
      <QuickViewStyled.StarWrapper>
        <StarDrawer starData={starData} />
      </QuickViewStyled.StarWrapper>
      <QuickViewStyled.ActionBar>
        <QuickViewStyled.ActionContent>
          <span>
            <QuickViewStyled.Avatar imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}/>
          </span>
          <QuickViewStyled.Description>
            Book a shoutout 
            from <strong>{props.userDetails.first_name}</strong> for <strong>${ props.celebDetails.rate && parseInt(props.celebDetails.rate, 0)}</strong> 
          </QuickViewStyled.Description>
        </QuickViewStyled.ActionContent>
        <QuickViewStyled.ActionSection>
            <PrimaryButton className='action-button'>Book Now</PrimaryButton>
        </QuickViewStyled.ActionSection>
      </QuickViewStyled.ActionBar>
    </RequestFlowPopup>
  );
};

QuickViewModal.propTypes = {
  toggleQuickView: PropTypes.func.isRequired,
  quickViewModal: PropTypes.object.isRequired,
  fetchStarDetails: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quickViewModal: state.modals.quickViewModal,
  celebDetails: state.starDetails.celebDetails.celebrityDetails,
  userDetails: state.starDetails.celebDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
  toggleQuickView: state => () => dispatch(toggleQuickView(state)),
  fetchStarDetails: id => dispatch(fetchStarDetails(id)),
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(QuickViewModal));
