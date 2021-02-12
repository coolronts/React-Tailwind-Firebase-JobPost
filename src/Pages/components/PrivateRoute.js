import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
 const {currentUser} = useAuth()
 return (
  <div>
   <Route {...rest}
    render={ 
     props => {
      return currentUser ? <Component {...rest}/> : <Redirect to="/LogIn" />
     }
    }
   >

   </Route>
  </div>
 )
}
