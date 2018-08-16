import React from 'react';
import { Link } from 'react-router-dom';
import TypeSelectorWrapper from './styled';


export const LoginTypeSelector = props => (
  <TypeSelectorWrapper>
    <TypeSelectorWrapper.Content>
      <TypeSelectorWrapper.heading>{props.isSignUp || props.isLogin ? 'Create your free account' : 'Ready to create videos for your fans?'}</TypeSelectorWrapper.heading>
      <TypeSelectorWrapper.subheading>{props.isSignUp || props.isLogin ? 'Choose your account type to get started' : 'Starsona is an easy way for you to connect with fans, make people incredibly happy, and earn money or fund raise for a cause you’re passionate about.'}
      </TypeSelectorWrapper.subheading>
    </TypeSelectorWrapper.Content>
    {props.isSignUp ?
      <React.Fragment>
        <div>
          <Link to={{ pathname: "/signup", state: { type: "fan" } }}>
            <TypeSelectorWrapper.Button>I’m a Fan</TypeSelectorWrapper.Button>
          </Link>
        </div>
        <div>
          <Link to={{ pathname: "/signup", state: { type: "star" } }}>
            <TypeSelectorWrapper.Button>I’m a Star</TypeSelectorWrapper.Button>
          </Link>
        </div>
      </React.Fragment>
      :
      <div>
        {!props.isLogin ?
          <TypeSelectorWrapper.Button onClick={() => { props.handleChange(); }}>I’m a Star</TypeSelectorWrapper.Button>
          :
          null
        }

      </div>
    }
    {props.isLogin ?
      <React.Fragment>
        <div>
          <TypeSelectorWrapper.Button onClick={() => { props.setRoleDetails('FAN'); }}>I’m a Fan</TypeSelectorWrapper.Button>
        </div>
        <div>
          <TypeSelectorWrapper.Button onClick={() => { props.setRoleDetails('STAR'); }} >I’m a Star</TypeSelectorWrapper.Button>
        </div>
      </React.Fragment> :
      null
    }

  </TypeSelectorWrapper>
);
