import React, { useEffect, useState } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        console.log("Token actual:", token);
        const response = await fetch('http://localhost:8080/api/categorias', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data); // 🔍 Verifica que imagenUrl esté presente
        setCategorias(data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener categorías: ' + err.message);
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [token]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Categorías</h1>
      <Button variant="success" className="mb-4">Agregar Categoría</Button>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex flex-wrap">
        {categorias.map(cat => (
          <Card key={cat.id} className="m-2" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={cat.imagenUrl} onError={(e) => e.target.src = '/fallback.jpg'} />
            <Card.Body>
              <Card.Title>{cat.nombre}</Card.Title>
              <Card.Text>{cat.descripcion}</Card.Text>
              <Button variant="warning" className="me-2">Modificar</Button>
              <Button variant="danger">Eliminar</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
