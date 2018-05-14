const config = {
    API_URL: '<API_URL goes here></API_URL>',
  }
  
  const env = key => config[key] || undefined;
  
  export default env;