import React from 'react';
import ManagePayments from '../../../../../components/ManagePayments';
import SettingsStyled from '../../../styled';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managePayment: false,
      firstName: '',
      lastName: '',
      email: '',
      errors: {
        firstName: false,
        lastName: false,
        email: false,
      },
    };
  }

  handleFieldChange = (fieldType, fieldValue) => {
    this.setState({
      [fieldType]: fieldValue,
      errors: { ...this.state.errors, [fieldType]: false },
    });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.managePayment ?
            <ManagePayments
              onClosePayments={() => this.setState({ managePayment: false })}
            />
          : null
        }
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>First name</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.firstName}
                  placeholder="First name"
                  onChange={(event) => {
                    this.handleFieldChange('firstName', event.target.value);
                  }}
                />
                <SettingsStyled.ErrorMsg isError={this.state.errors.firstName}>
                  {this.state.errors.firstName
                    ? 'Please enter a first name'
                    : null}
                </SettingsStyled.ErrorMsg>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Last name</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.lastName}
                  placeholder="Last name"
                  onChange={(event) => {
                    this.handleFieldChange('lastName', event.target.value);
                  }}
                />
                <SettingsStyled.ErrorMsg isError={this.state.errors.lastName}>
                  {this.state.errors.lastName
                    ? 'Please enter a last name'
                    : null}
                </SettingsStyled.ErrorMsg>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
        <SettingsStyled.HeadingWrapper>
          <SettingsStyled.SubHeading>
            Private information
          </SettingsStyled.SubHeading>
          <SettingsStyled.SubHeadingDescription>
            This information is private to you and will not be shared
            publicly
          </SettingsStyled.SubHeadingDescription>
        </SettingsStyled.HeadingWrapper>
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Email</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.email}
                  placeholder="Email"
                  onChange={(event) => {
                    this.handleFieldChange('email', event.target.value);
                  }}
                />
                <SettingsStyled.ErrorMsg isError={this.state.errors.email}>
                  {this.state.errors.email
                    ? 'Please enter a valid email'
                    : null}
                </SettingsStyled.ErrorMsg>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Password</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.ActionText>
                Manage your password
              </SettingsStyled.ActionText>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Payment method</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.ActionText onClick={() => this.setState({ managePayment: true })}>
                Manage your payments
              </SettingsStyled.ActionText>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Notifications</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CheckBoxesWrapper>
                <SettingsStyled.CheckBoxWrapper id="checkbox_container">
                  <span>Messages from Starsona</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={true}
                    onChange={(event) => { console.log('hi') }}
                  />
                  <span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
                <SettingsStyled.CheckBoxWrapper id="checkbox_container">
                  <span>Account updates</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={true}
                    onChange={(event) => { console.log('hi') }}
                  />
                  <span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
                <SettingsStyled.CheckBoxWrapper id="checkbox_container">
                  <span>My Starsona updates</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={true}
                    onChange={(event) => { console.log('hi') }}
                  />
                  <span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
              </SettingsStyled.CheckBoxesWrapper>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
      </React.Fragment>
    );
  }
}
