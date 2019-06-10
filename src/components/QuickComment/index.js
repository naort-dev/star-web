import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { commentList } from './constants';
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

  return (
    <CommentStyled showList={showList} className={props.classes.root}>
      <CommentStyled.CommentIcon showList={showList} innerRef={anchorEl} onClick={openList}>
        <FontAwesomeIcon icon={faBolt} />
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
                    commentList.map(comment => (
                      <li className="comment-item">{comment}</li>
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
}

QuickComment.propTypes = {
  classes: PropTypes.object,
}

export default QuickComment;
