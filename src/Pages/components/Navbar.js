import {React, useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'; 

const classes = {
  wrapper: 'w-full ',
  title: 'text-gray-800 text-xl text-center font-bold',
  image:'w-20 h-16',
  button: 'text-white text-sm font-semibold border px-4 py-2 mx-2 rounded-lg hover:text-green-600 hover:border-green-600',
  menu: 'text-gray-800 text-lg font-semibold text-green-600 mr-4',
  header: 'bg-white shadow',
  
};

const Navbar = () => {

  const { currentUser, logOut, isAdd, AddJob } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogOut() {
    setError('');
    try {
      await logOut();
      history.push('/')
    }
    catch {
      setError("Failed to Log Out");
    }
  }

  function handleAdd() {
    if (isAdd === true) {
      AddJob()
    }
    
  }
  
  return (
    
      <div className={classes.wrapper}>
        {error && <div className={classes.error}>{error}</div>} 
        <div className="bg-gray-800 shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
            <Link to="/"> <img onClick={handleAdd} className={classes.image} src={logo} alt="Logo"/></Link>
              {(currentUser && !isAdd) && <Link to="/DashBoard" className={classes.menu}>DashBoard</Link> }
            <div className="hidden sm:flex sm:items-center">
                {currentUser ? <Link to="/LogIn" className={classes.button} onClick={handleLogOut}>Log Out</Link>
                    : <div><Link to="/SignUp" className={classes.button}>Sign Up</Link>
                    <Link to="/LogIn" className={classes.button}>Log In</Link></div>
                }
              </div>
            </div>
          </div>
        </div>
        {(currentUser && isAdd) && 
          <header className={classes.header}>
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div class="text-3xl font-bold leading-tight text-gray-900">
                Dashboard <div className="inline text-xl text-red-500">Your Posted Job</div>
              </div>
            </div>
          </header>}
      </div>
  )
}

export default Navbar
