import React, { useState } from 'react';
import '../css/Appassociation.css';

const Appassociation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState([
    { id: 1, name: 'Facebook', logo: 'https://i.ibb.co/M2rTRmC/OIP.jpg', email: '', password: '' },
    { id: 2, name: 'Instagram', logo: 'https://i.ibb.co/723hp6X/download.jpg', email: '', password: '' },
    { id: 3, name: 'Twitter', logo: 'https://i.ibb.co/r2MTQ1H/OIP.jpg', email: '', password: '' },
    { id: 4, name: 'LinkedIn', logo: 'https://i.ibb.co/8xP7Fd4/OIP.jpg=', email: '', password: '' },
    { id: 5, name: 'Snapchat', logo: 'https://i.ibb.co/RykL88N/download.jpg', email: '', password: '' },
    { id: 6, name: 'TikTok', logo: 'https://i.ibb.co/gw0YKT5/OIP.jpg', email: '', password: '' },
    { id: 7, name: 'Youtube', logo: 'https://i.ibb.co/kqkLZC0/download.jpg', email: '', password: '' },
    { id: 8, name: 'Messenger', logo: 'https://i.ibb.co/HFbXR0R/download.jpg', email: '', password: '' },
    { id: 9, name: 'Netflix', logo: 'https://i.ibb.co/chdByB3/download.png', email: '', password: '' },
  ]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setEmail(application.email);
    setPassword(application.password);
  };

  const handleAssociate = () => {
    if (!selectedApplication) return;
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        return {
          ...app,
          email,
          password,
        };
      }
      return app;
    });
    console.log("Updated Applications:", updatedApplications); // Logging
    setApplications(updatedApplications);
    setEmail('');
    setPassword('');
    setSelectedApplication(null);
  };

  return (
    <div className="associate-page">
      <h2>Associate Applications</h2>
      <div className="applications-list">
        {applications.map(application => (
          <div key={application.id} className="application" onClick={() => handleApplicationClick(application)}>
            <img src={application.logo} alt={application.name} />
          </div>
        ))}
      </div>
      {selectedApplication && (
        <div className="form">
          <h3>{selectedApplication.name}</h3>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleAssociate}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Appassociation;