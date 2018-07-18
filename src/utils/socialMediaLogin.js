import { URL } from '../constants/url'

export function FBLogin(token, setValues) {
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: env('fbId'),
            cookie: true,
            xfbml: true,
            version: 'v3.0',
        });
        window.FB.getLoginStatus = (response) => {
            if (response.status === 'connected') {
                // for already connected
            } else {
                // user is not authorized
            }
        };
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = URL.facebookSDK;
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // const token = this.props.location.hash;
    const authToken = token.split('=')[1];
    const instaUrl = env('instaUrl') + authToken;
    const that = this;
    if (authToken !== undefined) {
        axios.get(instaUrl)
            .then(function (response) {
                setValues(response.data.data, 4);
            })
            .catch(function (error) {

            });
    }
    gapi.signin2.render('g-sign-in', {
        'scope': 'profile email',
        'width': 200,
        'height': 50,
        'theme': 'dark',
        'onsuccess': onSignIn,
    });
}


export function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    this.onSocialMediaLogin(profile, 3);
}

export function GmailLogin() {
    const check = document.getElementsByClassName('abcRioButtonIcon');
    check[0].click();
}

export function onInstagramLogin()  {
    const clientId = env('instaId');
    const redirectUri = env('signupInstaRedirectUri');
    const url = env('instaAuthUrl') + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=token';
    window.location.href = url;
}

export function OnFBlogin(onSocialMediaLogin) {
    window.FB.login(function (response) {
        if (response.authResponse) {
            window.FB.api('/me', { locale: 'en_US', fields: 'name, email,first_name,last_name,picture' },
                function (response) {
                    onSocialMediaLogin(response, 2);
                });
        }
    }, { scope: 'email', return_scopes: true })
}
