import { SIGN_UP } from './constants';

export function formatSignUpByUserType(userType) {
  let signUp = {
    title: SIGN_UP.TITLE,
    item_1: '',
    item_1_placeholder_1: SIGN_UP.ITEM_1_PLACEHOLDER_1,
    item_1_placeholder_2: SIGN_UP.ITEM_1_PLACEHOLDER_2,
    key_2: '',
    item_2: '',
    item_2_placeholder: '',
    func_name_2: '',
    key_3_1: '',
    key_3_2: '',
    item_3: '',
    func_name_3: '',
    item_3_placeholder_1: '',
    item_3_placeholder_2: '',
    button_label: ''
  }
  if (userType === 'star') {
    signUp = {
      ...signUp,
      item_1: SIGN_UP.STAR_ITEM_1_LABEL,
      key_2: SIGN_UP.STAR_ITEM_2_KEY,
      item_2: SIGN_UP.STAR_ITEM_2_LABEL,
      item_2_placeholder: SIGN_UP.STAR_ITEM_2_PLACEHOLDER,
      func_name_2: SIGN_UP.STAR_ITEM_2_FUNCTION,
      key_3_1: SIGN_UP.FAN_ITEM_3_KEY_1,
      key_3_2: '',
      func_name_3: SIGN_UP.STAR_ITEM_3_FUNCTION,
      item_3: SIGN_UP.COMMON_ITEM_LABEL,
      item_3_placeholder_1: SIGN_UP.STAR_ITEM_3_PLACEHOLDER,
      item_3_placeholder_2: '',
      button_label: SIGN_UP.STAR_BUTTON_LABEL
    }
  } else {
    signUp = {
      ...signUp,
      item_1: SIGN_UP.FAN_ITEM_1_LABEL,
      key_2: SIGN_UP.FAN_ITEM_2_KEY,
      item_2: SIGN_UP.COMMON_ITEM_LABEL,
      func_name_2: SIGN_UP.FAN_ITEM_2_FUNCTION,
      item_2_placeholder: SIGN_UP.FAN_ITEM_2_PLACEHOLDER,
      key_3_1: SIGN_UP.STAR_ITEM_3_KEY_1,
      key_3_2: SIGN_UP.STAR_ITEM_3_KEY_2,
      func_name_3: SIGN_UP.FAN_ITEM_3_FUNCTION,
      item_3: SIGN_UP.FAN_ITEM_3_LABEL,
      item_3_placeholder_1: SIGN_UP.FAN_ITEM_3_PLACEHOLDER_1,
      item_3_placeholder_2: SIGN_UP.FAN_ITEM_3_PLACEHOLDER_2,
      button_label: SIGN_UP.FAN_BUTTON_LABEL
    }
  }
  return signUp;
}
