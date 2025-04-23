import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CategoriaCard = ({ categoria, onEditar, onEliminar }) => {
  // Verificamos si imagenUrl está bien
  console.log('Categoria recibida:', categoria);

  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img variant="top" src={categoria.imagenUrl} />
      <Card.Body>
        <Card.Title>{categoria.nombre}</Card.Title>
        <Card.Text>{categoria.descripcion}</Card.Text>
        <Button variant="warning" className="me-2" onClick={() => onEditar(categoria.id)}>Modificar</Button>
        <Button variant="danger" onClick={() => onEliminar(categoria.id)}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
};

export default CategoriaCard;
