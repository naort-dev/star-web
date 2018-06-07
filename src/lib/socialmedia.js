class SocialMedia {
  static fbId = '1237328416404211';
  static instaId = '26885a83d43849ddbdf1950c81ad7530';
  static instaRedirectUri = 'http://localhost:8080/login';
  static instaAuthUrl = `https://api.instagram.com/oauth/authorize/?client_id=${instaId}&redirect_uri=${instaRedirectUri}&response_type=token`;
}

export default SocialMedia;
