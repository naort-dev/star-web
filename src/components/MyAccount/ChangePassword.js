import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import AlertView from '../AlertView';
import Loader from '../Loader';
import { changePassword, resetChangePassword } from '../../store/shared/actions/changePassword';

import Accounts from './styled';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      alertText: '',
    };
    this.props.resetChangePassword();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.changePasswordData.submitStatus) {
      this.setState({ alertText: nextProps.changePasswordData.message });
    }
  }

  onChangePassword = () => {
    if (this.validate()) {
      this.props.changePassword({
        new_password: this.state.password1.value,
        old_password: this.state.oldPassword.value,
      });
    }
  }

  onChange = field => (e) => {
    this.setState({ [field]: { value: e.target.value, message: '' } });
  }

  validate = () => {
    let flag = true;
    if (validator.isEmpty(this.state.oldPassword.value)) {
      this.setState({ oldPassword: { ...this.state.oldPassword, message: 'Enter a password' } });
      flag = false;
    }
    ['password1', 'password2'].forEach((item) => {
      if (!this.checkPassword(item)) flag = false;
    });
    return flag;
  }

  clearAlertText = () => {
    this.setState({ alertText: '' });
    this.props.onPasswordChange();
  }

  checkPassword = field => () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol

    if (validator.isEmpty(this.state[field].value)) {
      this.setState({ [field]: { ...this.state[field], message: 'Enter a  password' } });
      return false;
    }
    if (!pattern.test(this.state[field].value)) {
      this.setState({ [field]: { ...this.state[field], message: 'Enter a valid password with atleast one symbol' } });
      return false;
    }

    if (this.state.password1.value !== this.state.password2.value && this.state.password1.value !== '' && this.state.password2.value !== '') {
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
    const { oldPassword, password1, password2, alertText } = this.state;
    const { changePasswordData } = this.props;
    if (changePasswordData.isLoading) {
      return <Loader />;
    } else if (alertText !== '') {
      return (
        <AlertView
          message={alertText}
          closePopup={this.clearAlertText}
        />
      );
    }
    return (
      <Accounts.PopupWrapper>
        <Accounts.PopupHeader>Change password</Accounts.PopupHeader>
        <Accounts.InputFieldsWrapper>
          <Accounts.InputWraps>
            <Accounts.Input
              type="password"
              name="old-password"
              value={oldPassword.value}
              placeholder="Old password"
              onChange={this.onChange('oldPassword')}
            />
            <Accounts.ErrorMsg>{oldPassword.message}</Accounts.ErrorMsg>
          </Accounts.InputWraps>

          <Accounts.InputWraps>
            <Accounts.PasswordWrapper>
              <Accounts.Input
                type="password"
                name="password1"
                value={password1.value}
                placeholder="New password"
                onChange={this.onChange('password1')}
                onBlur={this.checkPassword('password1')}
              />
            </Accounts.PasswordWrapper>
            <Accounts.ErrorMsg>{password1.message}</Accounts.ErrorMsg>
          </Accounts.InputWraps>

          <Accounts.InputWraps>
            <Accounts.PasswordWrapper>
              <Accounts.Input
                type="password"
                name="password2"
                value={password2.value}
                placeholder="Re-enter new password"
                onChange={this.onChange('password2')}
                onBlur={this.checkPassword('password2')}
              />
            </Accounts.PasswordWrapper>
            <Accounts.ErrorMsg>{password2.message}</Accounts.ErrorMsg>
          </Accounts.InputWraps>

          <Accounts.ButtonWrapper>
            <Accounts.SignIn
              onClick={this.onChangePassword}
              disabled={changePasswordData.loading}
            >Change password
            </Accounts.SignIn>
          </Accounts.ButtonWrapper>
          <Accounts.ApiErrorMsg>{changePasswordData.error ? changePasswordData.error.message : ''}</Accounts.ApiErrorMsg>
        </Accounts.InputFieldsWrapper>
      </Accounts.PopupWrapper>
    );
  }
}


const mapStateToProps = state => ({
  changePasswordData: state.changePassword,
})

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(changePassword(data)),
  resetChangePassword: () => dispatch(resetChangePassword()),
})

export default connect (mapStateToProps, mapDispatchToProps)(ChangePassword);
