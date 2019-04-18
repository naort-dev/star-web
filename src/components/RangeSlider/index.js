import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeStyled from './styled';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RangeSlider = (props) => {

  const renderToolTip = (value) => {
    return (
      <RangeStyled.ToolTip>${value}</RangeStyled.ToolTip>
    );
  };

  return (
    <RangeStyled>
      <RangeStyled.Label left>${props.min}</RangeStyled.Label>
      <Range
        min={props.min}
        max={props.max}
        allowCross={false}
        onAfterChange={props.onAfterChange}
        defaultValue={[props.range.low, props.range.high]}
        tipFormatter={renderToolTip}
      />
      <RangeStyled.Label>${props.max}+</RangeStyled.Label>
    </RangeStyled>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  range: PropTypes.object.isRequired,
  onAfterChange: PropTypes.func.isRequired,
};

export default RangeSlider;
