export const RECEIVE_SCRAPBOOK = 'RECEIVE_SCRAPBOOK'

export const receiveScrapbook = scrapbook => {
  return {
    type: RECEIVE_SCRAPBOOK,
    scrapbook
  }
}