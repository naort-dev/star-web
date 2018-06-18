import React from 'react';
import { Link } from 'react-router-dom';
import TypeSelectorWrapper from './styled';


export const LoginTypeSelector = props => (
  <TypeSelectorWrapper>
    <TypeSelectorWrapper.Content>
      <TypeSelectorWrapper.heading>Create your free account</TypeSelectorWrapper.heading>
      <TypeSelectorWrapper.subheading>Choose your account type to get started
      </TypeSelectorWrapper.subheading>
    </TypeSelectorWrapper.Content>
    <div> 
      <Link to="/signup">
        <TypeSelectorWrapper.Button>I’m a Fan</TypeSelectorWrapper.Button>
      </Link>
    </div>
    <div>
      <Link to="/starsignup">
        <TypeSelectorWrapper.Button>I’m a Star</TypeSelectorWrapper.Button>
      </Link>
    </div>
    
  </TypeSelectorWrapper>
);
