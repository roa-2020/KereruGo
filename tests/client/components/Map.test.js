import React from "react";
import { shallow } from "enzyme";

import { Map } from "../../../client/components/Map";

//Map exists!
test("<Map />", () => {
  expect(<Map />).toBeDefined();
});

test("Profile has div", () => {
  // Arrange
  const expected = 1;

  // Act
  const wrapper = shallow(
    <Map
      auth={{ isAuthenticated: false, user: { username: "admin" } }}
    />
  );
  const actual = wrapper.find("div").length;

  // Assert
  expect(actual).toEqual(expected);
});
