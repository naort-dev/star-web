import React, { useState } from 'react';
import SwitchStyled from './styled';

const Switch = () => {

  const [checked, updateChecked] = useState(true);
  return (
    <SwitchStyled content="active">
      <input className="switch-input" type="checkbox" checked={checked} onChange={(event) => updateChecked(event.target.checked)} />
      <span className="slider"></span>
    </SwitchStyled>
  );
}

export default Switch;
