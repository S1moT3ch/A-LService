import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './style/styleLogin.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔐 Verifica autenticazione al mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://a-lservice-production-39a8.up.railway.app/api/check-auth', {
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.authenticated) {
          navigate('/user/dashboard/');
        }
      } catch (err) {
        console.error('Errore durante la verifica autenticazione:', err);
      }
    };

    checkAuth();
  }, [navigate]);

  // ✅ Funzione di login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://a-lservice-production-39a8.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem('token', result.token);
        setShowError(false);
        navigate('/user/dashboard/');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Errore nella richiesta:', error);
      setShowError(true);
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
          <input
            type="text"
            name="username"
            className="input-fixed"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br /><br />

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="pwd"
              className="input-fixed"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br /><br />
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