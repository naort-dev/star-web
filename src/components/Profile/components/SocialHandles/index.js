import React, { useState } from 'react';
import { connect } from 'react-redux';
import { faFacebookF, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout, Heading, Content } from  './styled';
import { BackArrow } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { TextInput } from '../../../TextField';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings'; 

const SocialHandles = props => {

  const [socialLinks, setsocialLinks] = useState(props.userDetails.settings_userDetails.social_links ? props.userDetails.settings_userDetails.social_links : []);

  const onLinkChange = (event, socialLinkKey) => {
    const updatedSocialLinks = socialLinks.map(link => {
      if(link.social_link_key === socialLinkKey) {
        const linkValue = link.social_link_value.split('.com/');
        link.social_link_value = `${linkValue[0]}.com/${event.target.value}`
      }
      return link;        
    });
    setsocialLinks(updatedSocialLinks);
  }
  const getInputValue = (socialLinkKey, substring) => {
      let value;
      socialLinks.filter(link => {
      if(link.social_link_key === socialLinkKey) {
        value = link.social_link_value.replace(substring,'');
      }
    });
    return value;
  }
  const saveSocialHandles = () => {
    const finalUserDetails = {
      celebrity_details: {},
      user_details: {
        social_links: socialLinks,
      },
    };
    props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
  }
  return(
    <Layout>
      <BackArrow className="leftArrow" onClick={props.goBack}/>
      <Heading>{ props.heading }</Heading>
      <Content>
        <Content.SubTitle>
          { props.subTitle }
        </Content.SubTitle>
        <Content.MiddleSection>
          <Content.InputWraper>
          <FontAwesomeIcon className="socialmedia-icon" icon={faFacebookF}/>
          <Content.InputLabel>www.facebook.com/</Content.InputLabel>
            <TextInput
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: 'input-root',
                },              
              }}
              value={getInputValue('facebook_url', 'https://www.facebook.com/')}
              onChange={(event) =>onLinkChange(event, 'facebook_url')}
            />
          </Content.InputWraper>
          <Content.InputWraper>
            <FontAwesomeIcon className="socialmedia-icon" icon={faTwitter}/>
            <Content.InputLabel>www.twiter.com/</Content.InputLabel>
            <TextInput
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: 'input-root',
                  }
                }}
                value={getInputValue('twitter_url', 'https://www.twitter.com/')}
                onChange={(event) =>onLinkChange(event, 'twitter_url')}
            />
          </Content.InputWraper>
          <Content.InputWraper>
            <FontAwesomeIcon className="socialmedia-icon" icon={faInstagram}/>
            <Content.InputLabel>www.instagram.com/</Content.InputLabel>
            <TextInput
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: 'input-root',
                  }
                }}
                value={getInputValue('instagram_url', 'https://www.instagram.com/')}
                onChange={(event) =>onLinkChange(event, 'instagram_url')}
            />
        </Content.InputWraper>
        <Content.InputWraper>
          <FontAwesomeIcon className="socialmedia-icon" icon={faYoutube}/>
          <Content.InputLabel>www.youtube.com/</Content.InputLabel>
          <TextInput
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: 'input-root',
                }
              }}
              value={getInputValue('youtube_url', 'https://www.youtube.com/')}
              onChange={(event) =>onLinkChange(event, 'youtube_url')}
          />
        </Content.InputWraper>
      </Content.MiddleSection>
      </Content>
      <Layout.ButtonWrapper className="align-center">
          <PrimaryButton className='save-button'onClick={saveSocialHandles} >
            Save             
          </PrimaryButton>
        </Layout.ButtonWrapper>

    </Layout>
  );
}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  };
}

const SocialHandlesRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialHandles);
export { SocialHandlesRoot };