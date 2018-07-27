import React from 'react';
import Tabs from './styled';

const SettingsTab = props => (
  <Tabs>
    <Tabs.Ul>
      <Tabs.List onClick={() => props.changeAccountType('myAccount')} selected={props.selected === 'myAccount'}>My Account</Tabs.List>
      <Tabs.List onClick={() => props.changeAccountType('starAccount')} selected={props.selected === 'starAccount'}>Star Account</Tabs.List>
    </Tabs.Ul>
  </Tabs>
);
export default SettingsTab;
