export const dataModal = name => ({
  category: [
    {
      header: `Personalized <span>Shout-Out</span>`,
      text: `Celebrate everyday moments with a personalized video greeting from ${name}. Birthdays, encouragement, graduations… you pick.`,
      icon: '../../assets/images/shoutout.svg',
      type: 1,
    },
    {
      header: 'Announcement',
      text: `Have ${name} invite everyone to your next party, the big game, your wedding, life update, etc. Then send it out!`,
      icon: '../../assets/images/announcement.svg',
      type: 2,
    },
    {
      header: 'Ask a Question ',
      text: `Video yourself asking ${name} a question. When they respond, we’ll stitch the two videos together so you get a great Q&A interaction.`,
      icon: '../../assets/images/question.svg',
      type: 3,
    },
  ],
});
