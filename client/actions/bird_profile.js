export const RECEIVE_BIRDPROFILE = 'RECEIVE_BIRDPROFILE'

export const receiveBirdProfile = bird_profile => {
  return {
    type: RECEIVE_BIRDPROFILE,
    bird_profile 
  }
}