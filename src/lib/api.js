class Api {
  static getCelebList = 'user/fan/celebrity_list/get_list/';
  static authGetCelebList = 'user/fan/celebrity_list/';
  static getProfessionsList = 'user/filtered_professions/';
  static getVideosList = 'request/featured_videos/';
  static login = 'user/login/';
  static register = 'user/register/'
  static getSuggestionList = 'user/fan/suggestion_list/';
  static socialMediaLogin = 'user/socialsignup/';
  static authGetCelebDetails = 'user/user_details/';
  static getCelebDetails = id => `user/user_details/${id}/get_details/`;
  static getUserFavourites = 'user/fan/favourite_stars/';
  static getUserVideos = 'request/request_list/';
  static followCelebrity = 'user/fan/celebrity_follow/';
  static getOccasionList = 'request/occasion_list/';
}

export default Api;

