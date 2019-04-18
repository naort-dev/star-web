import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import RangeStyled from './styled';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const RangeSlider = (props) => {

  const renderToolTip = (value) => {
    return `$${value}`;
  };

  return (
    <RangeStyled>
      <RangeStyled.Label left>${props.min}</RangeStyled.Label>
      <Range
        min={props.min}
        max={props.max}
        allowCross={false}
        handle={handle}
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
