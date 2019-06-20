export const STAR_PROFILE = {
  DESCRIPTION: `Complete your Starsona profile to maximize your bookings:`,
  INNER_LINKS: [
    {
      linkName: 'Profile Name & Photo',
      selectedName: 'name&photo',
      url: '/manage/profile/name-photo',
    },
    { linkName: 'Bookings', selectedName: 'requests', url: '/manage/bookings' },
    {
      linkName: 'Promotional Tools',
      selectedName: 'promotional',
      url: '/manage/promotional-tools',
    },
    { linkName: 'Profile', selectedName: 'profile', url: '/manage/profile' },
    { linkName: 'Earnings', selectedName: 'earnings', url: '/manage/earnings' },
    {
      linkName: 'Account Settings',
      selectedName: 'settings',
      url: '/manage/settings',
    },
    {
      linkName: 'Referral Program',
      selectedName: 'referral',
      tooltip:
        'Do you have contacts that would enjoy Starsona? Help them sign up using your referral code and earn 20% of our commission!',
      url: '/manage/referral',
    },
  ]
};