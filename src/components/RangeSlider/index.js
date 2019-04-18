import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import RangeStyled from './styled';

const RangeSlider = (props) => {

  const [sliderValues, onSetSlider] = useState([props.range.low, props.range.high]);

  const onSliderChange = (value) => {
    const newSliderValue = [];
    newSliderValue[0] = value[0];
    newSliderValue[1]= value[1];
    onSetSlider(newSliderValue);
  };

  return (
    <RangeStyled>
      <RangeStyled.Label left>${sliderValues[0]}</RangeStyled.Label>
      <Range
        min={props.min}
        max={props.max}
        allowCross={false}
        onChange={onSliderChange}
        value={sliderValues}
        onAfterChange={props.onAfterChange}
        defaultValue={[props.range.low, props.range.high]}
      />
      <RangeStyled.Label>${sliderValues[1]}{sliderValues[1] >= props.max ? '+' : '' }</RangeStyled.Label>
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
