import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import Popover from '@material-ui/core/Popover';
import PickerStyled from './styled';

const Picker = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <PickerStyled>
      <PickerStyled.Selected>
        Popularity
        <PickerStyled.Arrow>
          <FontAwesomeIcon icon={faChevronDown} />
        </PickerStyled.Arrow>
      </PickerStyled.Selected>
    </PickerStyled>
  );
};

export default Picker;
