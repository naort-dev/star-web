export const questionsAbout = [
  {
    key: 'que1',
    question: 'Who you are',
  },
  {
    key: 'que2',
    question: 'What you are known for',
  },
  {
    key: 'que3',
    question: 'Why you have created your Starsona (charity, fun, etc…)',
  },
  {
    key: 'que4',
    question:
    'Send some love to you fans! Tell them how excited you are to connect with them',
  },
];

export const questionsVideo = () => {
  const question = [...questionsAbout];
  question[4] = {
    key: 'que4',
    question:
      'Remember, this is Starsona, and your videos never have to be perfect. Your fans will appreciate seeing you be YOU!',
  };
  return question;
};
