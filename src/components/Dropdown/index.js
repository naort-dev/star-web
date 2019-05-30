import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import DropdownStyled from './styled';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    const list = props.options
      ? props.options.map(option => ({
          label: option[props.labelKey],
          value: option[props.valueKey],
        }))
      : [];
    const selected = list.find((option) => option.value === props.selected[props.valueKey])
    this.state = {
      showDropList: false,
      list,
      selected,
    };
    this.cursorPos = -1;
    this.optionList = React.createRef();
    this.selectRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('click', this.checkWindowClick.bind(this));
    window.addEventListener('touchmove', this.checkWindowClick.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.checkWindowClick.bind(this));
    window.removeEventListener('touchmove', this.checkWindowClick.bind(this));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { list, selected } = prevState;
    list = nextProps.options
      ? nextProps.options.map(option => ({
          label: option[nextProps.labelKey],
          value: option[nextProps.valueKey],
        }))
      : [];
    selected = list.find((option) => option.value === nextProps.selected[nextProps.valueKey])
    return { list, selected };
  }

  toggleDropDown = state => () => {
    this.cursorPos = -1;
    this.setState({ showDropList: state });
  };

  checkWindowClick = e => {
    if (this.selectRef.current && !this.selectRef.current.contains(e.target)) {
      this.toggleDropDown(false)();
    }
  };

  findActualOption = option => {
    const { options, labelKey } = this.props;
    return options.find(optionItem => optionItem[labelKey] === option.label);
  };

  selectOption = option => event => {
    if (event.nativeEvent.type === 'click') {
      this.setState({ selected: option });
      this.props.onChange(this.findActualOption(option));
      this.toggleDropDown(false)();
    } else if (event.nativeEvent.type === 'keyup' && event.keyCode === 13) {
      this.setState({ selected: option });
      this.props.onChange(this.findActualOption(option));
      this.toggleDropDown(false)();
    }
  };

  handleListKeyUp = event => {
    const { showDropList } = this.state;
    const { cursorPos } = this;
    const { options } = this.props;
    if (event.key === 'ArrowUp' && showDropList && cursorPos - 1 >= 0) {
      this.optionList.current.childNodes[cursorPos - 1].focus();
      this.cursorPos = cursorPos - 1;
    } else if (
      event.key === 'ArrowDown' &&
      showDropList &&
      cursorPos + 1 < options.length
    ) {
      this.optionList.current.childNodes[cursorPos + 1].focus();
      this.cursorPos = cursorPos + 1;
    }
  };

  handleScrollbarsMount = (node) => {
    this.optionList.current = node && node.view;
  }

  render() {
    const { showDropList, list, selected } = this.state;
    const { placeHolder, secondary, rootClass } = this.props;
    return (
      <DropdownStyled className={`cus-drop ${rootClass}`}>
        <DropdownStyled.Select
          secondary={secondary}
          showList={showDropList}
          onClick={this.toggleDropDown(!showDropList)}
          tabIndex="0"
          onKeyUp={this.handleListKeyUp}
          innerRef={this.selectRef}
          className={this.props.className && this.props.className}
        >
          <DropdownStyled.CurrentSelected className="customPlaceholder">
            {(selected && selected.label) || placeHolder || 'select'}
          </DropdownStyled.CurrentSelected>
          <DropdownStyled.DropIcon />
          {showDropList && (
            <DropdownStyled.OptionsList secondary={secondary}>
              <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={346} ref={this.handleScrollbarsMount}>
                  {list.map(item => (
                    <DropdownStyled.Options
                      secondary={secondary}
                      tabIndex="0"
                      onClick={this.selectOption(item)}
                      onKeyUp={this.selectOption(item)}
                      key={item.value}
                    >
                      {item.label}
                    </DropdownStyled.Options>
                  ))}
              </Scrollbars>
            </DropdownStyled.OptionsList>
          )}
        </DropdownStyled.Select>
      </DropdownStyled>
    );
  }
}

Dropdown.defaultProps = {
  placeHolder: 'Select',
  className: '',
  rootClass:'drop-down',
  secondary: false,
  selected: {},
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  selected: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  rootClass: PropTypes.string,
};
