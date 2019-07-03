export const STAR_PROFILE = {
  DESCRIPTION: `Complete your Starsona profile to maximize your bookings:`,
  INNER_LINKS: [
    {
      linkName: 'Profile Name & Photo',
      selectedName: 'name&photo',
      url: '/manage/profile/name-photo',
    },
    { linkName: 'Welcome Video', selectedName: 'welcome video', url: '/manage/profile/welcome-video' },
    {
      linkName: 'Bio',
      selectedName: 'bio',
      url: '/manage/profile/bio',
    },
    { linkName: 'Industry', selectedName: 'industry', url: '/manage/profile/industry' },
    // { linkName: 'Tags', selectedName: 'tags', url: '/manage/earnings' },
    {
      linkName: 'Social handles',
      selectedName: 'social',
      url: '/manage/profile/social-handles',
    },
    {
      linkName: 'Price & Limits',
      selectedName: 'pricelimit',
      url: '/manage/profile/price-limits',
    },
  ],
  SOCIAL_HANDLE: {
    subtitle: 'Adding your social media allows you to quickly promote yourself and increase bookings.',
    heading: 'Social Handles',
  },
  PRICE_AND_LIMITS: {
    confirmDescription: 'Pick a price that is worth it to you, and still within the range of your fans.',
    description: 'How much should your fans pay for you to create a video?',
    title: 'Set your price and limits',
    confirmationTitle: 'Are you sure?',
    titleMobile: 'Price & Limits',
  }
};
