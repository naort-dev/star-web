import React from 'react';
import TypeSelectorWrapper from './styled';


export class LoginTypeSelector extends React.Component  {

  state = {
    selectedOption: null,
  }

  setOptionType = (value) => {
    this.setState({ selectedOption: value});
  }

  render() {
    return (
      <TypeSelectorWrapper>
        <TypeSelectorWrapper.ComponentWrapper>
          <TypeSelectorWrapper.OptionWrapper>
            <TypeSelectorWrapper.HeaderText>
              Create your account
            </TypeSelectorWrapper.HeaderText>
            <TypeSelectorWrapper.SocialMediaMessage>
              Already have an account?
              <span onClick={() => this.props.toggleLogin(true)}>
                <TypeSelectorWrapper.LoginDiv>Log in</TypeSelectorWrapper.LoginDiv>
              </span>
            </TypeSelectorWrapper.SocialMediaMessage>
            <TypeSelectorWrapper.ButtonWrapper>
              <div className="round-radio">
                <ul className="list">
                  <li className="list">
                    <div>
                      <input
                        type="radio"
                        id="f-option"
                        name="selector"
                        value="fan"
                        onClick={event =>
                          this.setOptionType(event.target.value)
                        }
                      />
                      <label htmlFor="f-option">
                        Fan account
                        <div className="option-content">
                        Search for your favorite stars and book  personalized videos from them.
                        </div>
                      </label>
                      <div className="check" />
                    </div>
                  </li>
  
                  <li className="list">
                    <div>
                      <input
                        type="radio"
                        id="s-option"
                        name="selector"
                        value="star"
                        onClick={event =>
                          this.setOptionType(event.target.value)
                        }
                      />
                      <label htmlFor="s-option">
                        Star account
                        <div className="option-content">
                        Engage with your most loyal fans and create unique <span>one - of - a - kind</span> videos for them.
                        </div>
                      </label>
                      <div className="check" />
                    </div>
                  </li>
  
                  <li className="list">
                    <div>
                      <input
                        type="radio"
                        id="t-option"
                        name="selector"
                        value="group"
                        onClick={event =>
                          this.setOptionType(event.target.value)
                        }
                      />
                      <label htmlFor="t-option">
                        Group account
                        <div className="option-content">
                        For those who represent a group such as a charity, brand, team, or university.
                        </div>
                      </label>
                      <div className="check" />
                    </div>
                  </li>
                </ul>
              </div>
            </TypeSelectorWrapper.ButtonWrapper>
          </TypeSelectorWrapper.OptionWrapper>
          <TypeSelectorWrapper.PaymentControllerWrapper>
            {this.state.selectedOption ? (
              <TypeSelectorWrapper.ContinueButton
                onClick={() =>
                  this.props.changeSignUpRole(this.state.selectedOption)
                }
              >
                Next
              </TypeSelectorWrapper.ContinueButton>
            ) : (
              <TypeSelectorWrapper.DisableButton disabled>
                Next
              </TypeSelectorWrapper.DisableButton>
            )}
          </TypeSelectorWrapper.PaymentControllerWrapper>
        </TypeSelectorWrapper.ComponentWrapper>
      </TypeSelectorWrapper>
    );
  }
}
