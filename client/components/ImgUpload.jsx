import React from "react";

class ImgUploader extends React.Component {
  render() {
    return (
      <>
        <form action="post">
          <label for="profile-pic">Choose a file to upload</label>
          <input
            type="file"
            name="profile-pic"
            id="profile-pic"
            name="profile_pic"
            accept=".jpg, .jpeg, .png"
          />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default ImgUploader;
