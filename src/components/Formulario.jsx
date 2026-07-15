import React, { useState } from 'react';

const Formulario = ({ agregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const manejarEnvio = (evento) => {
    evento.preventDefault(); 

    if (nombre.trim() === '' || precio === '' || categoria === '') {
      setMensajeError('Todos los campos son obligatorios.');
      return; 
    }

    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      setMensajeError('El precio debe ser un número mayor a cero.');
      return;
    }

    setMensajeError('');

    const nuevoProducto = {
      id: Date.now(),
      nombre: nombre,
      precio: precioNumerico,
      categoria: categoria
    };

    agregarProducto(nuevoProducto);

    setNombre('');
    setPrecio('');
    setCategoria('');
  };

  return (
    <div className="tarjeta">
      <h2>Registrar Nuevo Producto</h2>
      {mensajeError && <p className="error">{mensajeError}</p>}
      
      <form onSubmit={manejarEnvio}>
        <div className="grupo-input">
          <label>Nombre del producto:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>

    <div className="grupo-input">
          <label>Precio ($):</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <label>Categoría:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">-- Seleccione una categoría --</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Oficina">Oficina</option>
            <option value="Hogar">Hogar</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        <button type="submit" className="btn-guardar">Guardar Producto</button>
      </form>
    </div>
  );
};

export default Formulario;
