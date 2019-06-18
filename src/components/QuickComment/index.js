import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import { Scrollbars } from 'react-custom-scrollbars';
import { commentGenerator } from './utils';
import addVideoComment from '../../services/addVideoComment';
import CommentStyled from './styled';

const QuickComment = (props) => {

  const anchorEl = useRef(null);
  const scrollRef = useRef(null);
  const [showList, toggleList] = useState(false);

  const openList = () => {
    toggleList(!showList);
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
    <CommentStyled showList={showList} className={props.classes.root}>
      <CommentStyled.CommentIcon showList={showList} innerRef={anchorEl} onClick={openList}>
        <span className='icon-image' />
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
              <img alt='heart' src='assets/images/heart.png' />
              <img alt='happy' src='assets/images/happy.png' />
              <img alt='trophy' src='assets/images/trophy.png' />
              <img alt='thumbsup' src='assets/images/thumbsup.png' />
            </span>
            <CommentStyled.ListWrapper>
              <ul className="comment-list">
                <Scrollbars
                  ref={scrollRef}
                  renderThumbVertical={scrollProps => <div {...scrollProps} className="thumb-vertical"/>}
                >
                  {
                    commentGenerator(fanName).map(comment => (
                      <li className="comment-item" onClick={addComment(comment)}>{comment}</li>
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
  )
}

QuickComment.defaultProps = {
  classes: {},
  fanName: '',
}

QuickComment.propTypes = {
  classes: PropTypes.object,
  fanName: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateToast: errorObject => dispatch(updateToast(errorObject)),
  loaderAction: state => dispatch(loaderAction(state)),
});

export default connect(null, mapDispatchToProps)(QuickComment);
