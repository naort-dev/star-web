import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { faFacebookF, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Heading, Content } from  './styled';
import { BackArrow } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { TextInput } from '../../../TextField';
import { socialData } from './constants';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings'; 

const SocialHandles = props => {

  const [socialLinks, setsocialLinks] = useState({});

  useEffect(() => {
    let newSocialLinks = {...socialLinks};
    if (!props.userDetails.settings_userDetails.social_links.length) {
      newSocialLinks = {
        'facebook_url': '',
        'twitter_url': '',
        'youtube_url': '',
        'instagram_url': '',
      }
    } else {
      props.userDetails.settings_userDetails.social_links.forEach((link) => {
        newSocialLinks[link.social_link_key] = link.social_link_value === '' ? '' : link.social_link_value.split(socialData[link.social_link_key].url)[1];
      })
    }
    setsocialLinks(newSocialLinks)
  }, [props.userDetails.settings_userDetails.social_links])

  const onLinkChange = (event, socialKey) => {
    const updatedSocialLinks = {...socialLinks, [socialKey]: event.target.value.trim('')};
    setsocialLinks(updatedSocialLinks);
  }

  const saveSocialHandles = () => {
    const newSocialLinks = [];
    Object.keys(socialLinks).forEach((socialKey) =>{
      const newSocialItem = {
        social_link_key: socialKey,
        social_link_value: socialLinks[socialKey] === '' ? '' : `${socialData[socialKey].url}${socialLinks[socialKey]}`
      }
      newSocialLinks.push(newSocialItem);
    })
    const finalUserDetails = {
      celebrity_details: {},
      user_details: {
        social_links: newSocialLinks,
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
              value={socialLinks.facebook_url}
              onChange={(event) =>onLinkChange(event, 'facebook_url')}
            />
          </Content.InputWraper>
          <Content.InputWraper>
            <FontAwesomeIcon className="socialmedia-icon" icon={faTwitter}/>
            <Content.InputLabel>www.twitter.com/</Content.InputLabel>
            <TextInput
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: 'input-root',
                  }
                }}
                value={socialLinks.twitter_url}
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
                value={socialLinks.instagram_url}
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
              value={socialLinks.youtube_url}
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
