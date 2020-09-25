import React from "react";
import { apiGetUserScrapbook } from "../apis/index";

class Scrapbook extends React.Component {
  state = {
    birds: [],
  };

  componentDidMount() {
    apiGetUserScrapbook(1).then((birds) => {
      console.log(birds);
      this.setState({
        birds: birds,
      });
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
            <div className="columns">
              {this.state.birds.map((item) => {
                return (
                  <div key={item.birdId} className="birds column is-half">
                    <img
                      className="img"
                      src="https://via.placeholder.com/100"
                      alt={`${item.birdName}`}
                    />
                    <h3>{item.birdName}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Scrapbook;
