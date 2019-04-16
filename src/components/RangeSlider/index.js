import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeStyled from './styled';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RangeSlider = () => {
  return (
    <RangeStyled>
      <RangeStyled.Label left>$0</RangeStyled.Label>
      <Range
        min={0}
        max={20}
        allowCross={false}
        defaultValue={[3, 10]}
        tipFormatter={value => `$${value}`}
      />
      <RangeStyled.Label>$20</RangeStyled.Label>
    </RangeStyled>
  );
};

export default RangeSlider;
