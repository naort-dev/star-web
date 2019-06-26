import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolTip from '../../../ToolTip';
import TippingStyled from './styled';

const Tipping = (props) => {
  return (
    <TippingStyled>
      <ToolTip title='Tips are never required but always appreciated!'>
        <span className='action-title'>Want to give an additional tip?</span>
      </ToolTip>
      <ul className='tipping-list'>
        {
          props.tipAmounts.map((tip, index) => (
            <li className='tipping-item' key={index}>${tip}</li>
          ))
        }
        <li className='tipping-item'>Custom</li>
      </ul>
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
