import React from 'react';
import Select from 'react-select';
import './multiselect'

export default class MultiSelect extends React.Component {
    render() {
        return (
                <Select
                    {...this.props.otherOptions}
                    closeOnSelect={false}
                    multi
                    options={this.props.industry}
                    onChange={(value) => this.props.handleFieldChange('profession', value)}
                    placeholder="Select your favourite(s)"
                    simpleValue
                    value={this.props.profession}
                />
        )
    }
}
