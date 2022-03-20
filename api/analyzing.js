// Analysis utility functions

import entry from './db/models/entry.js'
import config from './config.js'
import { EMPTY_ANALYSIS } from './constants.js'

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
      'There was an error while trying to analyze sentiment. This entry will have an empty analysis. entry title:',
      entry.title,
      'Error:',
      error
    )
    return EMPTY_ANALYSIS
  }
}

export async function addAnalysisToEntries(entries, client) {
  const analyzedEntries = await entries.map(async (entry) => {
    return await addAnalysisToEntry(entry, client)
  })

  const resolvedAnalyzedEntries = await Promise.all(analyzedEntries)
  return resolvedAnalyzedEntries
}

export async function addAnalysisToEntry(entry, client) {
  const analysis = await analyzeEntry(entry, client)
  entry.analysis = analysis

  return entry
}
