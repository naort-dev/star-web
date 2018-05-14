export const requestOnSuccess = (config) => {
  // config.header[con]

  return config;
};

export const requestOnFailed = error => Promise.reject(error);

export const responseOnSuccess = response => response;

export const responseOnFailed = (error) => {
  

  return Promise.reject(error);
};
