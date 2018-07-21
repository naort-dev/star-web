import React from 'react'
import Select from 'react-select'
import './tags.js'

export default class SelectTags extends React.Component {
    constructor(props) {
        super(props)
        this.state = { multi: true}
    }

    render() {
        return (
                <Select.Creatable
                    multi={true}
                    onChange={(value) => this.props.handleFieldChange('searchTags', value)}
                    value={this.props.searchTags}
                    showNewOptionAtTop={true}
                    placeholder={"Add hashtags to help Fans find you quicker"}

                />
        )
    }
}