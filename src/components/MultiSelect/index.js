import React from 'react';
import Select from 'react-select';
import './multiselect'

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            removeSelected: true,
            disabled: false,
            crazy: false,
            stayOpen: false,
            value: [],
            rtl: false,
        }
    }

    handleSelectChange(value) {
        if (value.split(',').length <= 3) {
            this.setState({ value });
        }
        
    }

    render() {
        const { crazy, disabled, stayOpen, value } = this.state;
        return (
            <div style={{ width: "80%" }}>
                <Select
                    closeOnSelect={true}
                    disabled={disabled}
                    multi
                    options={this.props.industry}
                    onChange={(value) => this.handleSelectChange(value)}
                    placeholder="Select your favourite(s)"
                    simpleValue
                    value={value}
                    placeholder={"choose your industry"}
                />
            </div>

        )
    }
}