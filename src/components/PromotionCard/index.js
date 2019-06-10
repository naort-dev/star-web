import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PromoTemplate from 'components/PromoTemplates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Layout } from './styled';

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
}

const postImageToFacebook = (token, filename, mimeType, imageData, message) => {
  var fd = new FormData();
  fd.append('access_token', token);
  fd.append('source', imageData);
  fd.append('no_story', true);

  // Upload image to facebook without story(post to feed)
  axios({
    method: 'post',
    url: `https://graph.facebook.com/me/photos?access_token=${token}`,
    data: fd,
  })
    .then(function(data) {
      alert('axios post--------');
      FB.api('/' + data.id + '?fields=images', function(response) {
        alert('fb api--------');
        if (response && !response.error) {
          // Create facebook post using image
          FB.api(
            '/me/feed',
            'POST',
            {
              message: '',
              picture: response.images[0].source,
              link: window.location.href,
              name: 'starsona',
              description: message,
              privacy: {
                value: 'SELF',
              },
            },
            function(response) {
              if (response && !response.error) {
                /* handle the result */
                console.log('Posted story to facebook');
                console.log(response);
              }
            },
          );
        }
      });
    })
    .catch(function(response) {
      //handle erro
      alert('error');
    });
};

const postCanvasToFacebook = () => {
  if (XMLHttpRequest.prototype.sendAsBinary === undefined) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
      const bytes = Array.prototype.map.call(string, function(c) {
        return c.charCodeAt(0) & 0xff;
      });
      this.send(new Uint8Array(bytes).buffer);
    };
  }
  const ctx = document.createElement('canvas');
  const data = ctx.toDataURL('image/png');
  const decodedPng = dataURItoBlob(data);
  FB.getLoginStatus(function(response) {
    alert(response.authResponse.accessToken);
    console(response);
    if (response.status === 'connected') {
      postImageToFacebook(
        response.authResponse.accessToken,
        'sample',
        'image/png',
        decodedPng,
        'sample',
      );
    } else if (response.status === 'not_authorized') {
      FB.login(
        function(response) {
          postImageToFacebook(
            response.authResponse.accessToken,
            'sample',
            'image/png',
            decodedPng,
            'sample',
          );
        },
        { scope: 'publish_actions' },
      );
    } else {
      FB.login(
        function(response) {
          postImageToFacebook(
            response.authResponse.accessToken,
            'sample',
            'image/png',
            decodedPng,
            'sample',
          );
        },
        { scope: 'publish_actions' },
      );
    }
  });
};

const Promotion = props => {
  useEffect(() => {
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    window.fbAsyncInit = function() {
      FB.init({
        appId: env('fbId'),
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      });
    };
  }, []);

  const getTemplate = profile => {
    let temp = profile.template;
    temp = temp.replace('@@prof-pic@@', profile.profilePic);
    temp = temp.replace('@@user-name@@', profile.name);
    return temp;
  };

  return (
    <Layout>
      <section className="header-sec">
        <h2 className="promotion-head">Keep Your Fans Informed!</h2>
        <p className="note-sec">
          <span className="share-link">Share your profile</span> on your social
          media and keep those bookings coming.{' '}
        </p>
        <PromoTemplate
          template={
            '<span class="img-back" style="background-image:url(.../../assets/images/bluebackground.svg); width: 265px; height: 265px; background-size: contain; display: inline-block; background-repeat: no-repeat; box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);"></span><span style="background-image:url(../../assets/images/default-cover.jpg);width: 118px;height: 118px;background-size: contain;display: inline-block;background-repeat: no-repeat; position: absolute;left: 74px; top: 43px; border-radius: 50%;"></span>'
          }
        />
      </section>
      <span className="share-text">Share your profile!</span>
      <section className="social-wrap">
        <span className="icon-wrap">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="social-icon"
            onClick={postCanvasToFacebook}
          />
          <span className="social-name">Facebook</span>
        </span>
        <span className="icon-wrap">
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <span className="social-name">Twitter</span>
        </span>
        <span className="icon-wrap">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          <span className="social-name">Instagram</span>
        </span>
      </section>
    </Layout>
  );
};

Promotion.propTypes = {};

export default Promotion;
