import React from 'react';
import { Request } from './styled';

export default class EventAnnouncement extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      eventDetails: props.eventDetails,
    };
  }
  componentWillMount() {   
  }
  render() {
    console.log(this.state);
  
    // const events = this.state.eventDetails;
    // const optionItems = events.map((events) =>
    //         <option key={events.id}>{events.title}</option>
    // );
  
    return (
      <Request.Wrapper>
        <Request>  
          <Request.InputFieldsWrapper>
            <Request.InputWrapper>
              <Request.Label>Event Type</Request.Label>
              <Request.WrapsInput>
                <Request.Select>
               
                </Request.Select>
                <Request.ErrorMsg></Request.ErrorMsg>
              </Request.WrapsInput>         
            </Request.InputWrapper>
          </Request.InputFieldsWrapper>
        </Request>
      </Request.Wrapper>
    );
  }
}
