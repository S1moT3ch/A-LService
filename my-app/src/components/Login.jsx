import React, { useState } from 'react';
import './style/styleLogin.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Simulazione gestione submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // In un'app reale qui faresti una chiamata API
    const fakeUsername = e.target.username.value;
    const fakePassword = e.target.password.value;

    if (fakeUsername !== 'admin' || fakePassword !== '1234') {
      setShowError(true);
    } else {
      setShowError(false);
      // Redirect o logica post-login
    }
  };

  return (
    <div
      className="modulo"
      style={{
        backgroundImage: 'url("/images/sfondo_login_2.jpg")',
        backgroundSize: 'cover',
        minHeight: '100vh',
    
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="header">
        <img src="/images/Logo_full.png" alt="Logo AL" className="logo" />
        <h1 className="caption">Gestionale di A&L</h1>
    </div>

      <div className="login-container">
        <h1>Effettua l'accesso</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required /><br /><br />

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="pwd"
              required
            /><br /><br />
          </div>

          <div className="show-password">
            <input
              type="checkbox"
              id="togglePwd"
              onChange={handleTogglePassword}
            />
            <label htmlFor="togglePwd">Mostra password</label>
          </div>

          {showError && (
            <div className="errore" id="errorBox">
              Credenziali errate. Riprova.
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;