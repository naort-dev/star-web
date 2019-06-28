import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ReactionUpload from './components/ReactionUpload';
import Tipping from './components/Tipping';
import Share from '../Share';
import ToolTip from '../ToolTip';
import StarRating from '../StarRating';
import ActionStyled from './styled';

const ActionBar = (props) => {

  const listRef = useRef(null);
  const [actionStates, setActionStates] = useState([{
    reaction: !props.disableReaction,
    rating: !props.disableRating,
  }])
  const [showList, toggleList] = useState(false);

  const toggleListState = (state) => () => {
    toggleList(state);
  }

  const windowClickListener = (event) => {
    if (listRef.current && !listRef.current.contains(event.target) && showList) {
      toggleListState(false)();
    }
  }
  
  useEffect(() => {
    window.addEventListener('click', windowClickListener);
    return () => {
      window.removeEventListener('click', windowClickListener);
    }
  }, [showList])

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
                  shareUrl=''
                />
              </div>
            </ToolTip>
            <ToolTip title=' Upload your reaction video or photo, the Stars really love them. Videos formats must be mp4. Photos can be .png or .jpg.'>
              <div>
                <ReactionUpload />
              </div>
            </ToolTip>
            <Tipping onTipping={props.onTipping} />
            <div className='rating-wrapper'>
              <span className='action-title'>
                Add a rating
              </span>
              <StarRating />
            </div>
          </ActionStyled.List>
      }
    </ActionStyled>
  )
}

ActionBar.defaultProps = {
  placeholder: 'Show some love for this video',
  disableRating: false,
  disableReaction: false,
  onTipping: () => {},
}

ActionBar.propTypes = {
  placeholder: PropTypes.string,
  disableRating: PropTypes.bool,
  disableReaction: PropTypes.bool,
  onTipping: PropTypes.func,
}

export default ActionBar;
