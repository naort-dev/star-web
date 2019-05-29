import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
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
    <CommentStyled>
      <CommentStyled.CommentIcon showList={showList} innerRef={anchorEl} onClick={openList}>
        <FontAwesomeIcon icon={faBolt} />
      </CommentStyled.CommentIcon>
        <CommentStyled.Popover
          id="quick-comment-popper"
          open={showList}
          anchorEl={anchorEl && anchorEl.current}
          onClose={handleClose}
          classes={{ paper: 'paper-root' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <CommentStyled.OptionWrapper>
            <span className="option-title">Post a Quick Response</span>
          </CommentStyled.OptionWrapper>
        </CommentStyled.Popover>
    </CommentStyled>
  )
}

export default QuickComment;