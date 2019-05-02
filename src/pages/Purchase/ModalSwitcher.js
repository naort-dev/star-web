import React from 'react';

const ModalSwitcher = ({ children, ...rest }) => {
  return (
    <React.Fragment>
      {React.cloneElement(children, {
        ...rest,
      })}
    </React.Fragment>
  );
};

export default ModalSwitcher;
