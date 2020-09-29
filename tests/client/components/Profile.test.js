import React from 'react'
import { mount, shallow } from 'enzyme'

jest.mock('../../../client/apis', () => {
    return {
        apiGetUserScrapbook: () => Promise.resolve([])
    }
})

import {Profile} from '../../../client/components/Profile'
// test('<Profile />', () => {
//   const wrapper = shallow(<Profile auth={{isAuthenticated: true}} dispatch={() => {}}/>)
//   //console.log(wrapper.debug())
  
//   const expected = 1
//   expect(wrapper.find('h3')).toHaveLength(expected);
// })


test('Profile has h3', () => {
    // Arrange
    const expected = 1
  
    // Act
    const wrapper = shallow(<Profile auth={{isAuthenticated: false, user:{username:"admin"}}} progress={{totalBirds:null}}/>)
    const actual = wrapper.find('h3').length
  
    // Assert
    expect(actual).toEqual(expected)
  })