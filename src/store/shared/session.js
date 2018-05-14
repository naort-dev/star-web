console.log('!!!! (0.O) !!!!!');
console.log('isLoggedIn is true!');
console.log('role is SUPER_ADMIN!');
console.log('!!!! (0.O) !!!!!');

const initalState = {
  firstname: '',
  lastname: '',
  username: '',
  laslogin: '',
  role: '',
  isLoggedIn: false,
  loading: false,
  error: {
    has: false,
    message: '',
  },
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case 'session/ON_LOGIN':
      return {
        ...initalState,
        loading: true,
      };

    case 'session/ON_LOGIN_SUCCESS':
      return {
        ...initalState,
        ...action.user,
        isLoggedIn: true,
        loading: false,
      };

    case 'session/ON_LOGIN_FAILED':
      return {
        ...initalState,
        loading: false,
        error: {
          has: true,
          message: action.message,
        },
      };

    default:
      return state;
  }
};
