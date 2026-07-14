import React, { useState } from 'react';
import Formulario from './components/Formulario'; // Importamos desde la carpeta components
import './App.css'; 

const App = () => {
  const [productos, setProductos] = useState([]); 
  const [filtro, setFiltro] = useState('Todos');

  const agregarProductoNuevo = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirmar) {
      const nuevosProductos = productos.filter((producto) => producto.id !== id);
      setProductos(nuevosProductos);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    if (filtro === 'Todos') return true;
    return producto.categoria === filtro;
  });

  const costoTotal = productos.reduce((acumulador, producto) => {
    return acumulador + producto.precio;
  }, 0);

  return (
    <div className="contenedor">
      <h1>Administración de Inventario</h1>

      {/* Llamamos al componente que creamos en la otra carpeta */}
      <Formulario agregarProducto={agregarProductoNuevo} />

      <div className="controles">
        <div className="filtro">
          <label>Filtrar por categoría: </label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Oficina">Oficina</option>
            <option value="Hogar">Hogar</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Otra">Otra</option>
          </select>
        </div>
        
        <div className="total">
          <h3>Costo total del inventario: <br/>${costoTotal.toFixed(2)}</h3>
        </div>
      </div>

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="4" className="texto-centro">No hay productos para mostrar.</td>
            </tr>
          ) : (
            productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.categoria}</td>
                <td>
                  <button 
                    onClick={() => eliminarProducto(producto.id)} 
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;