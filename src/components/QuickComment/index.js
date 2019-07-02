import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import { fetchActivitiesList } from 'store/shared/actions/getActivities'
import { Scrollbars } from 'react-custom-scrollbars';
import LightningIcon from '../LightningIcon';
import ToolTip from '../ToolTip';
import { commentGenerator } from './utils';
import addVideoComment from '../../services/addVideoComment';
import CommentStyled from './styled';

const QuickComment = (props) => {

  const anchorEl = useRef(null);
  const scrollRef = useRef(null);
  const [disable, setDisable] = useState(false);
  const [showList, toggleList] = useState(false);

  const openList = () => {
    if (!disable) {
      toggleList(!showList);
    }
  };

  const handleClose = () => {
    toggleList(false);
  };

  const scrollPosChange = (type) => () => {
    const currentTop = scrollRef.current.getScrollTop();
    const scrollOffset = 20;
    if (type === 'below') {
      scrollRef.current.scrollTop(currentTop + scrollOffset);
    } else {
      scrollRef.current.scrollTop(currentTop - scrollOffset);
    }
  }

  const addComment = (comment) => async () => {
    props.loaderAction(true);
    try {
      await addVideoComment(props.videoId, comment);
      if (props.once) {
        setDisable(true);
      }
      if (props.bookingId) {
        props.fetchActivitiesList(props.bookingId, 0, true);
      }
      handleClose();
    } catch(exception) {
      props.updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      })
    }
    props.loaderAction(false);
  }

  const { fanName } = props;
  return (
    <ToolTip
      title={disable ? "You have sent a comment!" : 'Click to send a quick comment back to the fan. View details to write your own responses.'}
      classes={{
        toolTip: showList && 'tooltip-disable',
      }}
      placement="top"
    >
      <CommentStyled showList={showList} className={props.classes.root}>
        <CommentStyled.CommentIcon disable={disable} showList={showList} innerRef={anchorEl} onClick={openList}>
          <LightningIcon className='icon-image' />
          <span className='quick-arrow' />
        </CommentStyled.CommentIcon>
        <CommentStyled.Popover
          id="quick-comment-popper"
          open={showList}
          anchorEl={anchorEl && anchorEl.current}
          onClose={handleClose}
          classes={{ paper: 'paper-root' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <CommentStyled.OptionWrapper>
            <span className="option-title">Post a Quick Response</span>
            <span className="emoji-list">
              <img className='emoji-icon' alt='heart' src='assets/images/heart.png' onClick={addComment('❤️')} />
              <img className='emoji-icon' alt='happy' src='assets/images/happy.png' onClick={addComment('😃')} />
              <img className='emoji-icon' alt='trophy' src='assets/images/trophy.png' onClick={addComment('🏆')} />
              <img className='emoji-icon' alt='thumbsup' src='assets/images/thumbsup.png' onClick={addComment('👍')} />
            </span>
            <CommentStyled.ListWrapper>
              <ul className="comment-list">
                <Scrollbars
                  ref={scrollRef}
                  renderThumbVertical={scrollProps => <div {...scrollProps} className="thumb-vertical"/>}
                >
                  {
                    commentGenerator(fanName).map((comment, index) => (
                      <li className="comment-item" key={index} onClick={addComment(comment)}>{comment}</li>
                    ))
                  }
                </Scrollbars>
              </ul>
              <span className='arrow-list'>
                <span className='arrow arrow-1' onClick={scrollPosChange('top')} />
                <span className='arrow arrow-2' onClick={scrollPosChange('below')} />
              </span>
            </CommentStyled.ListWrapper>
          </CommentStyled.OptionWrapper>
        </CommentStyled.Popover>
      </CommentStyled>
    </ToolTip>
  )
}

QuickComment.defaultProps = {
  classes: {},
  fanName: '',
  once: false,
  bookingId: undefined,
}

QuickComment.propTypes = {
  classes: PropTypes.object,
  fanName: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
  once: PropTypes.bool,
  bookingId: PropTypes.string,
}

const mapDispatchToProps = dispatch => ({
  updateToast: errorObject => dispatch(updateToast(errorObject)),
  loaderAction: state => dispatch(loaderAction(state)),
  fetchActivitiesList: (bookingId, offset, refresh) => dispatch(fetchActivitiesList(bookingId, offset, refresh))
});

export default connect(null, mapDispatchToProps)(QuickComment);
