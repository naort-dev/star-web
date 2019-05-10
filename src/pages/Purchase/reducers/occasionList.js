import { OCCASION_LIST } from '../actions/purchaseActions';
import { AskQuestion } from '../actions/purchaseActions';

const initalState = {
  data: [],
  loading: false,
  videoUploaded: false,
  pageCount: 0,
  bookingData: {
    templateType: null,
    relationship: [],
    user: 'someoneElse',
    enableAudioRecorder: false,
    hostName: '',
    userName: '',
    relationshipValue: '',
    specification: '',
    date: null,
    eventName: '',
    validSelf: false,
    occasion: {},
  },
};

export default (state = initalState, action) => {
  switch (action.type) {
    case OCCASION_LIST.start:
      return {
        ...state,
        loading: true,
      };
    case OCCASION_LIST.end:
      return {
        ...state,
        loading: false,
      };
    case OCCASION_LIST.success:
      return {
        ...state,
        loading: false,
        data: action.details.occasion_list,
      };
    case OCCASION_LIST.failed:
      return {
        ...state,
        loading: false,
      };
    case OCCASION_LIST.reset:
      return {
        ...state,
        data: [],
      };
    case AskQuestion.videoUploaded:
      return {
        ...state,
        videoUploaded: action.value,
      };

    case OCCASION_LIST.pageCount:
      return {
        ...state,
        pageCount: action.value,
      };
    case OCCASION_LIST.bookingData:
      return {
        ...state,
        bookingData: action.data,
      };

    default:
      return state;
  }
};
