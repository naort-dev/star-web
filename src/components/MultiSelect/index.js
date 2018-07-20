import React from 'react';
import Select from 'react-select';
import './multiselect'

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            removeSelected: true,
            stayOpen: true,
        }
    }

    

    render() {
        const { crazy, disabled, stayOpen, value } = this.state;
        return (
                <Select
                    closeOnSelect={!this.state.stayOpen}
                    disabled={disabled}
                    multi
                    options={this.props.industry}
                    onChange={(value) => this.props.handleFieldChange('profession', value)}
                    placeholder="Select your favourite(s)"
                    simpleValue
                    value={this.props.profession}
                    placeholder={"choose your industry"}
                />
        )
    }
}