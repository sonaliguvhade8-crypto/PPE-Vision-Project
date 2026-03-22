import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <nav className="navbar" style={{ backgroundColor: 'rgb(10, 46, 71)' }} data-bs-theme="dark">
      <Link className="navbar-brand fs-1 fst-italic" to="/">PPE Vision</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home </Link></li>
         {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/live">Live Detection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">Reports</Link>
              </li>
            </>
          )}
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

          {!isLoggedIn ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="#logout" className="nav-link" onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("authToken");
                navigate("/login");
              }}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
