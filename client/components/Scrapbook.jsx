import React from "react";
import { getBirds } from "../apis/index";

class Scrapbook extends React.Component {
  state = {
    birds: [],
  };

  componentDidMount() {
    getBirds().then((birds) => {
      console.log(birds);
      console.log("birbs");
    });
  }

  render() {
    return (
      <>
        <div
          id="scrapbook"
          className="container content is-full has-background-primary"
        >
          <h1 className="has-text-white pt-3 has-text-centered">
            <i>Kereru Go!</i>
          </h1>
          <div className="card mx-4">
            <h2 className="has-text-centered pt-4">SCRAPBOOK</h2>
          </div>
        </div>
      </>
    );
  }
}

export default Scrapbook;
