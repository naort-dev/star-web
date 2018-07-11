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
<<<<<<< 6f9e291d1a3f3f5ffde8c632414facc4abab5667
  static downloadVideo = videoId => `${env('SERVER_URL')}download/${videoId}`;
=======
  static otherRelation = 'request/other_relation/';
>>>>>>>  for other reationship feature
}

export default Api;

