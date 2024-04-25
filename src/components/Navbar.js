// import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'

function Navbar() {
  //--gatting user from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser'));

  //--logout user
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="/"><img  className='logo-img' src="./images/logo.png" alt="logo" />BaBa's Rooms</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i className="fa fa-bars" style={{color: '#ffffff'}}></i></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-5">
            {user ? (<>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa-solid fa-user pr-2"></i>
                  {user.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/profile">Profile</a>
                  <a className="dropdown-item" href="#" onClick={logout}>Logout</a>

                </div>
              </div>
            </>)
              : (<>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="login">Login</a>
                </li>
              </>)}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
