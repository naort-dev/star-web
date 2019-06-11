import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import BoxStyled from './styled';

const CommentBox = (props) => {
  const [inputVal, setInputVal] = useState(props.value || '');

  const onInputChange = (event) => {
    setInputVal(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <BoxStyled className={props.classes.root}>
      <BoxStyled.Input
        value={inputVal}
        className={props.classes.input}
        onChange={onInputChange}
        placeholder="Add a comment..."
      />
      <FontAwesomeIcon className="message-icon" icon={faTelegramPlane} />
    </BoxStyled>
  )
}

CommentBox.defaultProps = {
  classes: {},
  onChange: () => {},
  value: undefined,
}

CommentBox.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default CommentBox;
