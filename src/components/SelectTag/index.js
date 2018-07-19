import React from 'react'
import Select from 'react-select'
import './tags.js'

export default class SelectTags extends React.Component {
    constructor(props) {
        super(props)
        this.state = { multi: true, multiValue: [], value: undefined }
    }

    handleOnChange(value) {

            this.setState({ multiValue: value });
    }
       
    render() {
        console.log("this.state for tags", this.state)


        return (

            <div style={{ width: "80%" }}>
                <Select.Creatable
                    multi={true}
                    onChange={(value) => this.handleOnChange(value)}
                    value={this.state.multiValue}
                    showNewOptionAtTop={true}
                    placeholder={"enter tags"}

                />
            </div>
        )
    }
}