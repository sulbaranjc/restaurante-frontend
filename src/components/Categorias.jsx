import React, { useEffect, useState, useCallback } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import AgregarCategoriaModal from './AgregarCategoriaModal'; // Importa el modal

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // Controla el modal
  const token = localStorage.getItem('token');

  // Refactorizado con useCallback
  const fetchCategorias = useCallback(async () => {
    try {
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
      setCategorias(data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener categorías: ' + err.message);
      setLoading(false);
    }
  }, [token]); // Token es dependencia porque puede cambiar

  // useEffect ahora usa la función memoizada
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleGuardarCategoria = async (categoria) => {
    const formData = new FormData();
    formData.append('nombre', categoria.nombre);
    formData.append('descripcion', categoria.descripcion);
    formData.append('imagen', categoria.imagen);

    try {
      const response = await fetch('http://localhost:8080/api/categorias/crear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      fetchCategorias(); // Refrescar lista
    } catch (err) {
      setError('Error al guardar categoría: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Categorías</h1>
      <Button variant="success" className="mb-4" onClick={() => setShowModal(true)}>Agregar Categoría</Button>

      <AgregarCategoriaModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleGuardar={handleGuardarCategoria}
      />

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
