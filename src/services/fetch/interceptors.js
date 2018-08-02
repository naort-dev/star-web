export function onRequest(config) {
  const customConfig = config;
  const token = JSON.parse(localStorage.getItem('data')) && JSON.parse(localStorage.getItem('data')).user.authentication_token;

  if (token && !customConfig.headers.Authorization) {
    customConfig.headers.Authorization = `Token ${token}`;
  }
  return config;
}

export const requestOnFailed = error => Promise.reject(error);

export const responseOnSuccess = response => response;

export const responseOnFailed = (error) => {
  const customError = { ...error };
  if (error.response) {
    const status = error.response.headers.status || error.response.status;
    customError.status = status;

    if (status === 401) {
      localStorage.clear();
      window.location.pathname = 'login';
    }
  }

  return Promise.reject(customError);
};
