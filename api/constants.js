export const IGNORED_USERNAMES = ['Anonymous']
export const EMPTY_ANALYSIS = {
  entitySentiment: {
    entities: [
      {
        mentions: [],
        name: 'null',
        type: 'null',
        salience: 0.0,
        sentiment: {
          magnitude: 0.0,
          score: 0.0,
        },
      },
    ],
    language: 'en',
  },
  documentSentiment: {
    sentences: [],
    documentSentiment: {
      magnitude: 0,
      score: 0,
    },
    language: 'en',
  },
}
