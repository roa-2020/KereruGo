import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

class Home extends React.Component {


    render() {
        return (
            <>
                {/* <div className="buttons">
               
                <Link to="/login" className="button is-rounded">Login</Link>
                <Link to="/register" className="button is-rounded">Register</Link>
        
                    {/* <button className="button is-rounded" onClick={}>Login</button>
                    <button className="button is-rounded" onClick={}>Register</button> */}
            
                {/* </div> */} 
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