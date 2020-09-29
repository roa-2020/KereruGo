import React from "react";
import { apiPostProfileImage } from "../apis/index";

class ImgUploader extends React.Component {
  // state = {
  //   selectedFile: [],
  // };

  fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    // this.setState({
    //   selectedFile: e.target.files[0],
    // });
    let file = e.target.files[0];
    apiPostProfileImage(file);
  };

  handleUpload() {
    apiPostProfileImage(this.state.selectedFile);
  }

  render() {
    return (
      <>
        <label htmlFor="profile-pic">Choose a file to upload</label>
        <input
          id="file"
          type="file"
          accept="image/*"
          name="profile-pic"
          encType="multipart/form-data"
          accept=".jpg, .jpeg, .png"
          onChange={this.fileSelectedHandler}
        />

        <button onClick={this.handleUpload}> Upload </button>
      </>
    );
  }
}

export default ImgUploader;
