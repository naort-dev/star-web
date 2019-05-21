import React, { useRef } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: '50%',
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
  };
}


const styles = () => ({
  arrowPopper: arrowGenerator('#000000'),
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  toolTip: {
    backgroundColor: '#000000',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Gilroy-Regular',
    padding: '15px',
    margin: 0,
    marginTop: '5px',
  }
});

const ToolTip = (props) => {

  const arrowRef = useRef(null);

  return (
    <Tooltip
      title={
        <React.Fragment>
          { props.title }
          <span className={props.classes.arrow} ref={arrowRef} />
        </React.Fragment>
      }
      classes={{ popper: props.classes.arrowPopper, tooltip: props.classes.toolTip }}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef.current),
              element: arrowRef.current,
            },
          },
        },
      }}
    >
      { props.children }
    </Tooltip>
  );
}

export default withStyles(styles)(ToolTip);

