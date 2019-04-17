import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeStyled from './styled';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RangeSlider = (props) => {
  return (
    <RangeStyled>
      <RangeStyled.Label left>$0</RangeStyled.Label>
      <Range
        min={props.min}
        max={props.max}
        allowCross={false}
        defaultValue={[props.min, props.max]}
        tipFormatter={value => `$${value}`}
      />
      <RangeStyled.Label>${props.max}+</RangeStyled.Label>
    </RangeStyled>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default RangeSlider;
