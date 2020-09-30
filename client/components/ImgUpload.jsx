import React from "react";
import { apiPostProfileImage } from "../apis/index";
import { connect } from "react-redux";

class ImgUploader extends React.Component {
  fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    console.log(this.props.auth.user);
    let file = e.target.files[0];
    let id = this.props.auth.user.id;
    console.log(id, file);
    apiPostProfileImage(id, file);
  };

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
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
  };
};

export default connect(mapStateToProps)(ImgUploader);
