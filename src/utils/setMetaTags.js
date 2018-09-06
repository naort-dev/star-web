export const setMetaTags = (title, imageUrl, description) => (
  [
    { property: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:image', content: imageUrl },
    { property: 'og:secure_url', content: imageUrl },
    { property: 'og:site_name', content: 'Starsona' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'twitter:description', content: description },
    { property: 'twitter:title', content: title },
    { property: 'twitter:site', content: 'Starsona' },
    { property: 'twitter:image', content: imageUrl },
    { property: 'twitter:creator', content: 'Starsona' },
    { name: 'google-play-app', content: `app-id=${env('androidAppId')}` },
    // { name: 'apple-itunes-app', content: `app-id=${env('iosAppId')}` },
  ]
);
