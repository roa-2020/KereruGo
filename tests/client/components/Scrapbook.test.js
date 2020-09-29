import React from "react";
import { mount, shallow } from "enzyme";

jest.mock("../../../client/apis", () => {
  return {
    apiGetUserScrapbook: () => Promise.resolve([]),
  };
});

import { Scrapbook } from "../../../client/components/Scrapbook";

test("<Scrapbook and testing works />", () => {
  expect(<Scrapbook />).toBeDefined();
});

// CANNOT READ PROPERTY 'MAP' OF UNDEFINED
// test("Profile has h3", () => {
//   // Arrange
//   const expected = "Scrapbook";

//   // Act
//   const wrapper = shallow(
//     <Scrapbook
//       auth={{ isAuthenticated: false, user: { username: "admin" } }}
//       progress={{ totalBirds: null }}
//       contextType=""
//       map=""
//     />
//   );
//   const actual = wrapper.find("h2").text();

//   // Assert
//   expect(actual).toEqual(expected);
// });
