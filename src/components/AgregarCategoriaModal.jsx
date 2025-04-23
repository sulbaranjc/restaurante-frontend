import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AgregarCategoriaModal({ show, handleClose, handleGuardar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null); // Para archivos

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !imagen) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Creamos un objeto con los datos y lo pasamos al padre
    const nuevaCategoria = { nombre, descripcion, imagen };
    handleGuardar(nuevaCategoria);
    // Limpiar campos
    setNombre('');
    setDescripcion('');
    setImagen(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescripcion" className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImagen" className="mt-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarCategoriaModal;
