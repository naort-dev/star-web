import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextInput } from '../../../TextField';
import SecondaryButton from '../../../SecondaryButton';
import ToolTip from '../../../ToolTip';
import TippingStyled from './styled';

const Tipping = (props) => {

  const [tip, setTip] = useState('');
  const [showCustomTip, toggleCustomTip] = useState(false);

  const changeCustomTipState = (state) => () => {
    toggleCustomTip(state);
  }

  const onTipChange = (event) => {
    const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
    if (pattern.test(event.target.value) || event.target.value === '') {
      setTip(event.target.value);
    }
  }

  return (
    <TippingStyled>
      <ToolTip title='Tips are never required but always appreciated!'>
        <span className='action-title'>Want to give an additional tip?</span>
      </ToolTip>
      <ul className='tipping-list'>
        {
          props.tipAmounts.map((tipValue, index) => (
            <li className='tipping-item' key={index}>${tipValue}</li>
          ))
        }
        <li className='tipping-item' onClick={changeCustomTipState(true)}>Custom</li>
      </ul>
      {
        showCustomTip &&
          <TippingStyled.CustomTipWrapper>
            <div className='custom-tip-wrapper'>
              $
              <TextInput
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: 'input-root',
                    multiline: 'input-textarea',
                  }
                }}
                value={tip}
                onChange={onTipChange}
              />
            </div>
            <SecondaryButton>Submit</SecondaryButton>
          </TippingStyled.CustomTipWrapper>
      }
    </TippingStyled>
  )
}

Tipping.propTypes = {
  tipAmounts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  tipAmounts: state.config.data.tipAmounts,
})

export default connect(mapStateToProps, null)(Tipping);
