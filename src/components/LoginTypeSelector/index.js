import React from 'react';
import TypeSelectorWrapper from './styled';


export const LoginTypeSelector = props => (
  <TypeSelectorWrapper>
    <TypeSelectorWrapper.Content>
      <TypeSelectorWrapper.heading>Create your free account</TypeSelectorWrapper.heading>
      <TypeSelectorWrapper.subheading>Chose your account type to get started
      </TypeSelectorWrapper.subheading>
    </TypeSelectorWrapper.Content>
    <TypeSelectorWrapper.Button>I’m a Fan</TypeSelectorWrapper.Button>
    <TypeSelectorWrapper.Button>I’m a Star</TypeSelectorWrapper.Button>
  </TypeSelectorWrapper>
);
