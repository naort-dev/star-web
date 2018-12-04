class Api {
  static getConfig = 'config/';
  static getCelebList = 'user/fan/celebrity_list/get_list/';
  static authGetCelebList = 'user/fan/celebrity_list/';
  static getProfessionsList = 'user/filtered_professions/';
  static getAllProfessions = 'user/professions/';
  static getGroupTypes = 'user/group_types/';
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
  static downloadVideo = videoId => `${env('SERVER_URL')}download/${videoId}`;
  static otherRelation = 'request/other_relation/';
  static getEphemeralKey = 'payments/generatekey/';
  static createCharge = 'payments/createcharge/';
  static starsonaRequest = 'request/stargramz/';
  static starsonaVideo = 'request/stargramz_video/';
  static getSourceList = 'payments/stripe_cards/';
  static modifySourceList = 'payments/attach_detach_source/';
  static forgotPassword = 'user/forgotpassword/';
  static resetPassword = 'user/resetpassword/';
  static getAWSVideo = 'user/get_signed_url/?key=stargram_videos&file_name=';
  static modifyUserDetails = 'user/user_details';
  static modifySocialLinks = 'user/social_links/';
  static updateGroupAccount = 'user/group_account/';
  static updateNotification = 'user/notification_settings/';
  static updatePhoto = 'user/profileimages/';
  static celebrityProfile = 'user/celebrity_profile/';
  static getImageCredentials = imageType => `user/signed_url/?extension=${imageType}&key=profile_images&file_type=image`;
  static changeRequestStatus = 'request/change_request_status/';
  static rating = 'user/fan/celebrity_rating/';
  static requestFeedback = 'request/feedback/';
  static contactSupport = 'user/contact_support/';
  static reportAbuse = 'user/fan/celebrity_abuse/'
  static stripeRegistration = 'payments/getstripeurl/';
  static checkStripe = 'payments/stripe_dashboard/';
  static changePassword = 'user/changepassword/';
  static getEarningsList = 'payments/earnings_list/';
  static requestReferral = 'user/referral_request/';
  static getReferralList = 'user/referral_list/';
  static getCommentsList = 'request/comments';
  static addComment = 'request/comments/';
  static groupMembersList = 'user/group_list/';
  static celebrityGroupFollow = 'user/join_group/';
  static fanGroupFollow = 'user/fan/group_follow/';
  static getGroupMembers = 'user/get_members/'
}

export default Api;

