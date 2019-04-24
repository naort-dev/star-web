import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCelebDetails } from '../../pages/starProfile/actions/getCelebDetails';
import { toggleQuickView } from '../../store/shared/actions/toggleModals';
import { pipeSeparator, getStarName } from '../../utils/dataToStringFormatter';
import RequestFlowPopup from '../RequestFlowPopup';
import VideoRender from '../VideoRender';
import QuickViewStyled from './styled';

const QuickViewModal = (props) => {

  useEffect(() => {
    if (props.quickViewModal.data) {
      props.fetchCelebDetails(props.quickViewModal.data);
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
            cover="assets/images/default-cover.jpg"
          />
        </QuickViewStyled.VideoContainer>
        <QuickViewStyled.Content>
          <QuickViewStyled.Categories>
            { pipeSeparator(props.celebDetails.profession_details, 'title') }
          </QuickViewStyled.Categories>
          <QuickViewStyled.StarName>{ getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name) }</QuickViewStyled.StarName>
        </QuickViewStyled.Content>
      </QuickViewStyled>
    </RequestFlowPopup>
  );
};

QuickViewModal.propTypes = {
  toggleQuickView: PropTypes.func.isRequired,
  quickViewModal: PropTypes.object.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quickViewModal: state.modals.quickViewModal,
  celebDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
  toggleQuickView: state => () => dispatch(toggleQuickView(state)),
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickViewModal);
