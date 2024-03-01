import { useContext } from 'react';
import jwt_decode from "jwt-decode";
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decoded = jwt_decode(token);
    var user_id = decoded.user_id;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img style={{ width: "150px", padding: "4px" }} src="https://i.ibb.co/8NMfjnQ/password-key.jpg" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {token && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Passwordgenerator">Passwordgenerator</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/appassociation">Appassociation</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {token === null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
              {token !== null && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
