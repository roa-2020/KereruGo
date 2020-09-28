export const RECEIVE_SCRAPBOOK = 'RECEIVE_SCRAPBOOK'
export const SAVE_PROGRESS = 'SAVE_PROGRESS'

export const receiveScrapbook = scrapbook => {
  return {
    type: RECEIVE_SCRAPBOOK,
    scrapbook
  }
}

export const saveProgress = (foundCount, totalBirds) => {
  return {
    type: SAVE_PROGRESS,
    foundCount, 
    totalBirds
  }
}