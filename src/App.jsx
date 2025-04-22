import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import RutaProtegida from './components/RutaProtegida';
import LoginForm from './components/LoginForm';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Sesión cerrada.');
    navigate('/');
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    alert('¡Bienvenido! Token guardado.');
    navigate('/');
  };
  

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/">🍽️ Restaurante</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {token && (
              <>
                <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
            {!token && (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="main-content d-flex flex-column justify-content-center align-items-center">
        <Routes>
          <Route path="/" element={<h1 className="display-4 text-primary fw-bold">Bienvenido al Restaurante</h1>} />
          <Route path="/categorias" element={
            <RutaProtegida>
              <h1 className="display-5 text-secondary">Categorías del Menú</h1>
            </RutaProtegida>
          } />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        </Routes>      
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
