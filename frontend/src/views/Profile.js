import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../css/Registerpage.css'; // Import your CSS file for Registerpage styling

function Profile() {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const { email, username, password, confirmPassword, profilePicture } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Create FormData object to send both text and file data
    const updatedData = new FormData();
    updatedData.append('email', email);
    updatedData.append('username', username);
    updatedData.append('password', password);
    updatedData.append('confirmPassword', confirmPassword);
    updatedData.append('profilePicture', profilePicture);

    // Call updateUserProfile function from context to update user profile
    updateUserProfile(updatedData);
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block bg-image" />
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }} />
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }} />
                            <span className="h2 fw-bold mb-0">Welcome 👋</span>
                          </div>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                          update your informations
                        </h5>
                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={handleChange} required />
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="text" id="form2Example18" className="form-control form-control-lg" name="username" value={username} onChange={handleChange} required />
                          <label className="form-label" htmlFor="form2Example18">Username</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={password} onChange={handleChange} />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example28" className="form-control form-control-lg" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                          <label className="form-label" htmlFor="form2Example28">Confirm Password</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Update Profile</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          
          <a className="text-dark" href="https://mdbootstrap.com/">
           
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Profile;