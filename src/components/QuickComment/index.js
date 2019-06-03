import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { commentList } from './constants';
import CommentStyled from './styled';

const QuickComment = (props) => {

  const anchorEl = useRef(null);
  const [showList, toggleList] = useState(false);

  const openList = () => {
    toggleList(!showList);
  };

  const handleClose = () => {
    toggleList(false);
  };

  return (
    <CommentStyled className={props.classes.root}>
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
            <ul className="comment-list">
              {
                commentList.map(comment => (
                  <li className="comment-item">{comment}</li>
                ))
              }
            </ul>
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