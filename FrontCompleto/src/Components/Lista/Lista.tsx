import { useEffect, useState } from 'react';
import { getAll, borrar, getByCategoriaId } from '../../Service/InstrumentoService';
import { getAllCategoria } from '../../Service/CategoriaService';
import Instrumento from '../../Entity/instrumento';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Lista.css";
import Categoria from '../../Entity/categoria';

export default function Lista() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');

  const handleSubmitForm = async (id: number) => {
    const confirmacion = window.confirm("¿Estás seguro que deseas eliminar este instrumento?");
    if (confirmacion) {
      try {
        await borrar(id);
        const response = await getAll();
        if (response.data && Array.isArray(response.data)) {
          setInstrumentos(response.data);
        } else {
          console.log("La respuesta no contiene un array de productos:", response.data);
        }
      } catch (error) {
        console.error("Error al eliminar el instrumento:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        const response2 = await getAllCategoria();
        setCategorias(response2.data);
        if (response.data && Array.isArray(response.data)) {
          setInstrumentos(response.data);
        } else {
          console.log("La respuesta no contiene un array de productos:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoriaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoriaId = e.target.value;
    setSelectedCategoria(categoriaId);
    const response = await getByCategoriaId(categoriaId);
    setInstrumentos(response.data);
  };

  return (
    <div id="instrumentos" className='mt-2'>
      <div className="container">
        <h5>Filtra por categoria</h5>
        <div className="d-flex justify-content-center">
          <select name="categoria" value={selectedCategoria} onChange={handleCategoriaChange} aria-placeholder="Categoria">
            <optgroup label="Categoria">
              <option> </option>
              {categorias.map((categoria: Categoria) => (
                <option key={categoria.id} value={categoria.id}> {categoria.denominacion}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
      <ul className="lista-instrumentos">
        {instrumentos.map(instrumento => (
          <li key={instrumento.id}>
            <img src={instrumento.imagen} alt={instrumento.instrumento} />
            <div className="info">
              <h3>{instrumento.instrumento}</h3>
              <strong style={{ fontSize: "larger" }}>$ {instrumento.precio}</strong>
              {instrumento.costoEnvio === "G" ? (
                <div id="gratis">
                  <img src="img/camion.png" alt="Envío Gratis" />
                  <p style={{ color: "#509920" }}>Envío gratis a todo el país</p>
                </div>
              ) : (
                <p style={{ color: "orange" }}>Costo de envío al interior de Argentina: ${instrumento.costoEnvio}</p>
              )}
              <p>{instrumento.cantidadVendida} vendidos</p>
              <Link to={`/abm/${instrumento.id}`}>
                <Button className='primary'>Editar</Button>
              </Link>
              <Button className='btn btn-danger' onClick={() => handleSubmitForm(instrumento.id)}>Borrar</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
