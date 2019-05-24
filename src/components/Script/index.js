import React from 'react';
import PropTypes from 'prop-types';
import StarDrawer from 'components/StarDrawer';
import { ScriptContainer, Script } from './styled';
import { ScriptGenerator } from '../ScriptGenerator';

const ScriptBuilder = ({ scriptData }) => {
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
      horizontal: '94%',
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
  const {
    hostName,
    userName,
    relationship,
    occasion,
    date,
    specification,
    templateType,
    responseTime,
    someOneElse,
  } = scriptData;
  return (
    <ScriptContainer>
      <section className="starWrapper">
        <StarDrawer starData={starDataSet1} />
      </section>
      <Script
        dangerouslySetInnerHTML={{
          __html: ScriptGenerator({
            templateType,
            forName: hostName.charAt(0).toUpperCase() + hostName.slice(1),
            fromName: userName.charAt(0).toUpperCase() + userName.slice(1),
            relationship: relationship.toLowerCase(),
            date,
            occasion: occasion.label.toLowerCase(),
            someOneElse,
            specification: specification.toLowerCase(),
            occasionKey: occasion.key,
            responseTime,
          }),
        }}
      />
      <section className="starWrapper">
        <StarDrawer starData={starDataSet2} />
      </section>
    </ScriptContainer>
  );
};

ScriptBuilder.propTypes = {
  scriptData: PropTypes.object.isRequired,
};

ScriptBuilder.defaultProps = {};

export default ScriptBuilder;
