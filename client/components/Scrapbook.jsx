import React from "react"
import { connect } from 'react-redux'
import { apiGetUserScrapbook } from "../apis/index"
import { receiveScrapbook } from '../actions/scrapbook'

class Scrapbook extends React.Component {
  componentDidMount() {
    apiGetUserScrapbook(1)
      .then(scrapbook => this.props.dispatch(receiveScrapbook(scrapbook)))
  }

  render() {
    return (
      <>
        <div
          id="scrapbook"
          className="container content is-full has-background-primary"
        >
          <h1 className="has-text-white pt-3 has-text-centered">
            <i>Kererū Go!</i>
          </h1>
          <div className="card mx-4">
            <h2 className="has-text-centered pt-4">SCRAPBOOK</h2>
            <div className="columns">
              {this.props.scrapbook.map((item) => {
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

function mapStateToProps(globalState) {
  return { scrapbook: globalState.scrapbook }
}

export default connect(mapStateToProps)(Scrapbook)