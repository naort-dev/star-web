import React, { Component } from 'react';
import { CheckboxWrapper } from './styled';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }
  componentDidMount() {
    this.setState({ checked: this.props.checked });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.checked !== newProps.checked) {
      this.setState({ checked: newProps.checked });
    }
  }
  handleChange = () => {
    if (this.props.onChange) this.props.onChange(!this.state.checked);
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <CheckboxWrapper>
        {this.props.placeholder}
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange}
        />
        <span className="checkmark" />
      </CheckboxWrapper>
    );
  }
}

export default Checkbox;
