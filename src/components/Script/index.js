import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import StarDrawer from 'components/StarDrawer';
import { ScriptContainer, Script } from './styled';

const ScriptBuilder = ({ scriptText, script }) => {
  const starDataSet1 = [
    {
      size: '28px',
      horizontal: '2%',
      vertical: '35px',
      rotation: '15deg',
      color: '#46829a',
    },
    {
      size: '22px',
      horizontal: '8%',
      vertical: '15px',
      rotation: '0deg',
      color: '#46829a',
    },
    {
      size: '15px',
      horizontal: '5%',
      vertical: '70px',
      rotation: '15deg',
      color: '#6dafc8',
    },
  ];
  const starDataSet2 = [
    {
      size: '34px',
      horizontal: '92%',
      vertical: '35px',
      rotation: '0deg',
      color: '#46829a',
    },
    {
      size: '22px',
      horizontal: '92%',
      vertical: '10px',
      rotation: '30deg',
      color: '#46829a',
    },
    {
      size: '20px',
      horizontal: '89%',
      vertical: '70px',
      rotation: '15deg',
      color: '#46829a',
    },
  ];
  return (
    <ScriptContainer>
      <section className="starWrapper">
        <StarDrawer starData={starDataSet1} />
      </section>
      {scriptText !== '' ? (
        <Script>
          <p className="script">{scriptText}</p>
        </Script>
      ) : (
        <Script
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(script),
          }}
        />
      )}
      <section className="starWrapper">
        <StarDrawer starData={starDataSet2} />
      </section>
    </ScriptContainer>
  );
};

ScriptBuilder.propTypes = {
  scriptText: PropTypes.string,
  script: PropTypes.string,
};

ScriptBuilder.defaultProps = {
  scriptText: '',
  script: '',
};

export default ScriptBuilder;
