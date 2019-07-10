import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReactionUpload from './components/ReactionUpload';
import Tipping from './components/Tipping';
import Share from '../Share';
import { sendFeedback } from '../../services/requestFeedback';
import { awsKeys } from '../../constants';
import { postReactionMedia, onReactionComplete } from '../../services/postReaction';
import { loaderAction, updateToast } from '../../store/shared/actions/commonActions';
import { toggleLogin } from '../../store/shared/actions/toggleModals';
import ToolTip from '../ToolTip';
import StarRating from '../StarRating';
import ActionStyled from './styled';

const ActionBar = (props) => {

  const listRef = useRef(null);
  const [actionStates, setActionStates] = useState({
    reaction: !props.disableReaction,
    rating: !props.disableRating,
  })
  const [showList, toggleList] = useState(props.initialSelection);

  const toggleListState = (state) => () => {
    toggleList(state);
  }

  const windowClickListener = (event) => {
    if (listRef.current && !listRef.current.contains(event.target) && showList) {
      toggleListState(false)();
    }
  }
  
  const onAction = (type) => (value) => {
    if (props.isLoggedIn) {
      props.onAction(type, value);
    } else {
      props.toggleLogin(true);
    }
  }

  const getReactionFile = (reactionFile) => {
    if (props.isLoggedIn) {
      const fileType = reactionFile.fileType === 'image' ? 1 : 2; // image = 1 video = 2
      props.loaderAction(true);
      postReactionMedia(awsKeys.reactions, reactionFile.fileData, reactionFile.extension, reactionFile.fileType)
        .then((resp) => {
          try {
              let uploadProgess;
              const fileUpload = () => {
                axios.post(resp.url, resp.formData, { onUploadProgress: async (progressEvent) => {
                  uploadProgess = (progressEvent.loaded / progressEvent.total) * 100;
                  if (uploadProgess === 100) {
                    const response = await sendFeedback('reaction', props.bookingId, {fileType, fileName: resp.fileName});
                    props.loaderAction(false);
                    if (response) {
                      onAction('reaction')(reactionFile);
                      onReactionComplete();
                      props.updateToast({
                        value: true,
                        message: 'Reaction file uploaded',
                        variant: 'success',
                      })
                    }
                  }
                }})
              }
            fileUpload();
          }
          catch(e) {
            props.loaderAction(false);
            props.updateToast({
              value: true,
              message: 'Cannot post reaction',
              variant: 'error',
            })
          }
        });
    } else {
     props.toggleLogin(true); 
    }
  }

  const onRate = async (rating) => {
    if (props.isLoggedIn) {
      try {
        const response = await sendFeedback('rating', props.bookingId, {rating: `${rating}`});
        if (response) {
          onAction('rating')(rating);
          setActionStates({
            ...actionStates,
            rating: false,
          })
          props.updateToast({
            value: true,
            message: 'video rated',
            variant: 'success',
          })
        }
      }
      catch(e) {
        props.updateToast({
          value: true,
          message: 'Cannot rate video',
          variant: 'error',
        })
      }
    } else {
      props.toggleLogin(true);
    }
  }

  useEffect(() => {
    window.addEventListener('click', windowClickListener);
    return () => {
      window.removeEventListener('click', windowClickListener);
    }
  }, [showList])

  useEffect(() => {
    setActionStates({
      reaction: !props.disableReaction,
      rating: !props.disableRating,
    })
  }, [props.disableRating, props.disableReaction])
  return (
    <ActionStyled>
      <ActionStyled.Dropbar showList={showList} onClick={toggleListState(!showList)}>
        <FontAwesomeIcon className='heart-icon' icon={faHeart} />
        <span className='placeholder'>{props.placeholder}</span>
        <FontAwesomeIcon className='arrow-icon' icon={showList ? faChevronUp : faChevronDown} />
      </ActionStyled.Dropbar>
      {
        showList &&
          <ActionStyled.List innerRef={listRef}>
            <ToolTip title='Starsona is built on a community of fans – allow others to enjoy this video.' placement='top'>
              <div>
                <Share
                  className='action-btn'
                  {...props.shareDetails}
                />
              </div>
            </ToolTip>
            {
              actionStates.reaction &&
                <ToolTip title=' Upload your reaction video or photo, the Stars really love them. Videos formats must be mp4. Photos can be .png or .jpg.'>
                  <div>
                    <ReactionUpload isLoggedIn={props.isLoggedIn} toggleLogin={props.toggleLogin} getReactionFile={getReactionFile} />
                  </div>
                </ToolTip>
            }
            <Tipping onTipping={onAction('tip')} />
            {
              actionStates.rating &&
                <div className='rating-wrapper'>
                  <span className='action-title'>
                    Add a rating
                  </span>
                  <StarRating onChange={onRate} />
                </div>
            }
          </ActionStyled.List>
      }
    </ActionStyled>
  )
}

ActionBar.defaultProps = {
  placeholder: 'Show some love for this video',
  disableRating: false,
  disableReaction: false,
  onAction: () => {},
  shareDetails: {},
}

ActionBar.propTypes = {
  placeholder: PropTypes.string,
  disableRating: PropTypes.bool,
  disableReaction: PropTypes.bool,
  onAction: PropTypes.func,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  bookingId: PropTypes.string.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  shareDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  loaderAction : state => dispatch(loaderAction(state)),
  updateToast: toastObject => dispatch(updateToast(toastObject)),
  toggleLogin: state => dispatch(toggleLogin(state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
