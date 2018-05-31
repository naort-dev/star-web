import React from 'react';
import { Link } from 'react-router-dom';
import TypeSelectorWrapper from './styled';


export const LoginTypeSelector = props => (
  <TypeSelectorWrapper>
    <TypeSelectorWrapper.Content>
      <TypeSelectorWrapper.heading>Create your free account</TypeSelectorWrapper.heading>
      <TypeSelectorWrapper.subheading>Chose your account type to get started
      </TypeSelectorWrapper.subheading>
    </TypeSelectorWrapper.Content>
    <Link to="/signup">
      <TypeSelectorWrapper.Button>I’m a Fan</TypeSelectorWrapper.Button>
    </Link>
    <Link to="/signup">
      <TypeSelectorWrapper.Button>I’m a Star</TypeSelectorWrapper.Button>
    </Link>
  </TypeSelectorWrapper>
);
