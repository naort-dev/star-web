import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import BoxStyled from './styled';

const CommentBox = (props) => {
  const [inputVal, setInputVal] = useState(props.value || '');

  const onInputChange = (event) => {
    if (event.target.value.length <= props.maxLength || props.maxLength === -1) {
      setInputVal(event.target.value);
      props.onChange(event.target.value);
    }
  }

  const onSubmit = () => {
    if (inputVal.trim() !== '') {
      props.onSubmit(inputVal);
      setInputVal('');
    }
  }

  const onKeyChange = (event) => {
    if (event.keyCode === 13) {
      onSubmit();
    }
  }

  return (
    <BoxStyled.Wrapper className={props.classes.root}>
      {
        props.maxLength !== -1 &&
          <BoxStyled.Reminder>
            {
              inputVal.length >= 45 &&
                `${props.maxLength - inputVal.length} characters remaining`
            }
          </BoxStyled.Reminder>
      }
      <BoxStyled className={props.classes.inputWrapper}>
        <BoxStyled.Input
          value={inputVal}
          className={props.classes.input}
          onChange={onInputChange}
          onKeyUp={onKeyChange}
          placeholder={props.placeholder}
        />
        <FontAwesomeIcon className={`message-icon ${props.classes.icon}`} icon={faTelegramPlane} onClick={onSubmit} />
      </BoxStyled>
    </BoxStyled.Wrapper>
  )
}

CommentBox.defaultProps = {
  classes: {},
  onChange: () => {},
  onSubmit: () => {},
  value: undefined,
  maxLength: -1,
  placeholder: 'Add a comment...'
}

CommentBox.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
}

export default CommentBox;
