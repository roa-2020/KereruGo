import React from "react";

class Scrapbook extends React.Component {
  render() {
    return (
      <>
        <div
          id="scrapbook"
          className="container is-full has-background-primary"
        >
          <h2 className="has-text-white">Kereru Go!</h2>
          <section className="section is-four-fifths">
            <div className="card">here's some content</div>
          </section>
        </div>
      </>
    );
  }
}

export default Scrapbook;
