// Analysis utility functions

import entry from './db/models/entry.js'

export async function analyzeEntry(entry, client) {
  const document = {
    content: entry.content,
    type: 'PLAIN_TEXT',
  }
  try {
    const [entitySentiment] = await client.analyzeEntitySentiment({ document })
    const [documentSentiment] = await client.analyzeSentiment({ document })
    return { entitySentiment, documentSentiment }
  } catch (error) {
    console.log(
      'there was an error while trying to analyze sentiment. This entry will have an empty analysis. entry title:',
      entry.title,
      'error:',
      error
    )
    return {
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
  }
}

export async function addAnalysisToEntries(entries, client) {
  const analyzedEntries = await entries.map(async (entry) => {
    // console.log('now analysing:', entry)
    return await addAnalysisToEntry(entry, client)
  })

  const resolvedAnalyzedEntries = await Promise.all(analyzedEntries)
  return resolvedAnalyzedEntries
}

export async function storeEntries(data) {
  entry.insertMany(data, (err, res) => {
    if (err) {
      console.log('there was an error', err)
    } else {
      console.log(' Entries successfully stored. Response:', res)
    }
  })
}

export async function addAnalysisToEntry(entry, client) {
  const analysis = await analyzeEntry(entry, client)
  entry.analysis = analysis

  return entry
}
