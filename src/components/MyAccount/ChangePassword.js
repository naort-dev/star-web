import React, { Fragment } from 'react';
import validator from 'validator';
import Accounts from './styled';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword1: false,
      showPassword2: false,
      oldPassword: {
        value: '',
        message: '',
      },
      password1: {
        value: '',
        message: '',
      },
      password2: {
        value: '',
        message: '',
      },
    };
  }

  onChangePassword = () => {
    if (this.validate()) {
      this.props.changePassword({
        new_password: this.state.password1.value,
        old_password: this.state.oldPassword.value,
      });
    }
  }

  onChange = (e, field) => {
    this.setState({ [field]: { value: e.target.value, message: '' } });
  }

  validate = () => {
    let flag = true;
    if (validator.isEmpty(this.state.oldPassword.value)) {
      this.setState({ oldPassword: { ...this.state.oldPassword, message: 'Enter a  password' } });
      flag = false;
    }
    ['password1', 'password2'].forEach((item) => {
      if (!this.checkPassword(item)) flag = false;
    });
    return flag;
  }

  checkPassword = (field) => {
    const pattern = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if (validator.isEmpty(this.state[field].value)) {
      this.setState({ [field]: { ...this.state[field], message: 'Enter a  password' } });
      return false;
    }
    if (!pattern.test(this.state[field].value)) {
      this.setState({ [field]: { ...this.state[field], message: 'Enter a valid password with atleast one symbol' } });
      return false;
    }

    if (this.state.password1.value !== this.state.password2.value) {
      this.setState({
        password1: { ...this.state.password1, message: "Password doesn't match" },
        password2: { ...this.state.password2, message: "Password doesn't match" },
      });
      return false;
    }
    this.setState({ [field]: { ...this.state[field], message: '', isValid: true } });
    return true;
  }


  render() {
    const { oldPassword, password1, password2 } = this.state;
    return (
      <Fragment>
        <Accounts.PopupHeader>Change password</Accounts.PopupHeader>
        <Accounts.InputFieldsWrapper>
          <Accounts.InputWraps>
            <Accounts.Input
              type="text"
              name="old-password"
              value={oldPassword.value}
              placeholder="Old password"
              onChange={e => this.onChange(e, 'oldPassword')}
            />
            <Accounts.ErrorMsg>{oldPassword.message}</Accounts.ErrorMsg>
          </Accounts.InputWraps>

          <Accounts.InputWraps>
            <Accounts.PasswordWrapper>
              <Accounts.Input
                type={this.state.showPassword1 ? 'text' : 'password'}
                name="password1"
                value={password1.value}
                placeholder="New password"
                onChange={e => this.onChange(e, 'password1')}
                onBlur={() => this.checkPassword('password1')}
              />
              <Accounts.ShowPassword onClick={() => this.setState({ showPassword1: !this.state.showPassword1 })} />
            </Accounts.PasswordWrapper>
            <Accounts.ErrorMsg>{password1.message}</Accounts.ErrorMsg>
          </Accounts.InputWraps>

          <Accounts.InputWraps>
            <Accounts.PasswordWrapper>
              <Accounts.Input
                type={this.state.showPassword2 ? 'text' : 'password'}
                name="password2"
                value={password2.value}
                placeholder="Re-enter new password"
                onChange={e => this.onChange(e, 'password2')}
                onBlur={() => this.checkPassword('password2')}
              />
              <Accounts.ShowPassword onClick={() => this.setState({ showPassword2: !this.state.showPassword2 })} />
            </Accounts.PasswordWrapper>
            <Accounts.ErrorMsg>{password2.message}</Accounts.ErrorMsg>
          </Accounts.InputWraps>

          <Accounts.ButtonWrapper>
            <Accounts.SignIn
              onClick={this.onChangePassword}
              disabled={this.props.loading}
            >Change password
            </Accounts.SignIn>
          </Accounts.ButtonWrapper>
        </Accounts.InputFieldsWrapper>
      </Fragment>
    );
  }
}
