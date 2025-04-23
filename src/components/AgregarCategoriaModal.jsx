import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card, Row, Col, Image } from 'react-bootstrap';

function AgregarCategoriaModal({ show, handleClose, handleGuardar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!imagen) {
      setPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(imagen);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imagen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !imagen) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevaCategoria = { nombre, descripcion, imagen };
    handleGuardar(nuevaCategoria);

    // Limpiar campos después de guardar
    setNombre('');
    setDescripcion('');
    setImagen(null);
    setPreviewUrl('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="p-3">
          <Row>
            <Col md={6}>
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

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Guardar
                </Button>
              </Form>
            </Col>

            <Col md={6} className="d-flex align-items-center justify-content-center">
              {previewUrl ? (
                <Image src={previewUrl} fluid rounded style={{ maxHeight: '300px' }} />
              ) : (
                <div className="text-muted">Previsualización de la imagen</div>
              )}
            </Col>
          </Row>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarCategoriaModal;
