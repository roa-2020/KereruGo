export const RECEIVE_BADGES = 'RECEIVE_BADGES'

export const receiveBadges = badges => {
  return {
    type: RECEIVE_BADGES,
    badges
  }
}