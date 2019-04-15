import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import RangeStyled from './styled';

const RangeSlider = () => {
  const [value, changeValue] = useState({ min: 2, max: 10 });
  return (
    <RangeStyled>
      <RangeStyled.Label left>$0</RangeStyled.Label>
      <InputRange
        maxValue={20}
        minValue={0}
        value={value}
        onChange={newValue => changeValue(newValue)}
      />
      <RangeStyled.Label>$20</RangeStyled.Label>
    </RangeStyled>
  );
};

export default RangeSlider;
