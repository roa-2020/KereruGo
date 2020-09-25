import React from "react";

class Scrapbook extends React.Component {
  state = {
    birds: [],
  };

  render() {
    return (
      <>
        <div
          id="scrapbook"
          className="container content is-full has-background-primary"
        >
          <h1 className="has-text-white pt-3 has-text-centered">Kereru Go!</h1>
          <div className="card mx-4">
            <h2 className="has-text-centered pt-4">SCRAPBOOK</h2>
          </div>
        </div>
      </>
    );
  }
}

export default Scrapbook;
