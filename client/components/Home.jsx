import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
    render() {
        return (
            <>
            <h1>KerurūGO!</h1>
            <button class="button is-rounded">Rounded</button>
            <button class="button is-rounded">Rounded</button>
            
            </>
        )
    }
}



//REDUX:
// const mapStateToProps = ({auth}) => {
//     return {
//       auth
//     }
//   }
  

// export default connect(mapStateToProps)(Home) 


export default Home