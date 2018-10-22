import React from 'react';
import SettingsStyled from '../../../styled';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        </SettingsStyled.InputwrapperDiv>
      </React.Fragment>
    );
  }
}
