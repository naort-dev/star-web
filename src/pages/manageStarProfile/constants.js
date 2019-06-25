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
    { linkName: 'Industry', selectedName: 'profile', url: '/manage/profile/industry' },
    { linkName: 'Tags', selectedName: 'earnings', url: '/manage/earnings' },
    {
      linkName: 'Social handles',
      selectedName: 'settings',
      url: '/manage/settings',
    },
    {
      linkName: 'Price & Limits',
      selectedName: 'referral',
      tooltip:
        'Do you have contacts that would enjoy Starsona? Help them sign up using your referral code and earn 20% of our commission!',
      url: '/manage/referral',
    },
  ]
};