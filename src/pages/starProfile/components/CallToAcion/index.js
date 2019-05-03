import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import fitty from 'fitty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import PrimaryButton from '../../../../components/PrimaryButton';
import ActionStyled from './styled';
import StarProfileStyled from '../../styled';

const CallToAction = (props) => {

  const getShortName = () => {
    const { userDetails } = props;
    let shortName = '';
    if (userDetails.nick_name) {
      [shortName] = userDetails.nick_name.split(' ');
    } else if (userDetails.first_name) {
      [shortName] = userDetails.first_name.split(' ');
    }
    return shortName;
  }

  const autoFitText = () => {
    fitty('#action-description', {
      minSize: 16,
      maxSize: 37,
    })
  }

  const toggleRequestFlow = () => {
    props.toggleRequestFlow(true);
  }

  useEffect(() => {
    autoFitText();
  }, [])

  useEffect(() => {
    autoFitText();
  })

  return (
    <ActionStyled available={props.celebDetails.availability}>
    <ActionStyled.ActionContent available={props.celebDetails.availability}>
      <ActionStyled.AvatarWrapper>
        <StarProfileStyled.Avatar imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}/>
      </ActionStyled.AvatarWrapper>
      <ActionStyled.DescriptionWrapper>
        <ActionStyled.Description id="action-description">
          {
            props.celebDetails.availability ? 
              <React.Fragment>
                Book <span className="long-description">a shoutout from </span>
                <strong>{getShortName()}</strong> for <strong>${ props.celebDetails.rate && parseInt(props.celebDetails.rate, 0)}</strong> 
              </React.Fragment>
            :
              <React.Fragment>
                <strong>{getShortName()}</strong> is temporarily unavailable. Come back later.
              </React.Fragment>
          }
        </ActionStyled.Description>
      </ActionStyled.DescriptionWrapper>
    </ActionStyled.ActionContent>
    {
      props.celebDetails.availability &&
        <ActionStyled.ActionSection>
          <ActionStyled.ArrowWrapper>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </ActionStyled.ArrowWrapper>
          <PrimaryButton className='action-button' onClick={toggleRequestFlow}>Book Now</PrimaryButton>
        </ActionStyled.ActionSection>
    }
  </ActionStyled>
  )
}

CallToAction.propTypes = {
  userDetails: PropTypes.object.isRequired,
  celebDetails: PropTypes.object.isRequired,
}

export default CallToAction;
