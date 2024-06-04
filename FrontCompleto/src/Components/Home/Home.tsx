import { useEffect, useState } from 'react';
import { getAll, getByCategoriaId } from '../../Service/InstrumentoService';
import { getAllCategoria } from '../../Service/CategoriaService';
import InstrumentoE from '../../Entity/instrumento';
import "./Home.css";
import Categoria from '../../Entity/categoria';
import { Carrito } from '../Carrito/Carrito';
import { CarritoContextProvider } from '../../Context/CarritoContext';
import Instrumento from '../Instrumento/Instrumento';
import { DondeEstamos } from '../DondeEstamos/DondeEstamos';
import { Carrusel } from './Carrusel';

export default function Home() {
  const [instrumentos, setInstrumentos] = useState<InstrumentoE[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        const response2 = await getAllCategoria();
        setCategorias(response2.data);
        if (response.data && Array.isArray(response.data)) {
          setInstrumentos(response.data);
        } else {
          console.log("La respuesta no contiene un array de instrumentos:", response.data);
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
    <>
      <div className='container'>
        <h1>Musical Hendrix</h1>
        <Carrusel />
        <p>Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia.
          Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones
          para tu compra musical.</p>
      </div>
      <DondeEstamos />
      <CarritoContextProvider>
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
          <div className='content'>
            <div className='instrumentos'>
                {instrumentos.map(instrumento => (
                    <Instrumento key={instrumento.id} id={instrumento.id} instrumento={instrumento.instrumento} marca={instrumento.marca}
                      modelo={instrumento.modelo} imagen={instrumento.imagen} precio={instrumento.precio} costoEnvio={instrumento.costoEnvio}
                      cantidadVendida={instrumento.cantidadVendida} descripcion={instrumento.descripcion} categoria={instrumento.categoria}
                      cantidad={instrumento.cantidad} />
                ))}
            </div>
            <div className='carrito'>
              <b>Carrito de compras</b>
              <Carrito />
            </div>
          </div>
        </div>
      </CarritoContextProvider>
    </>
  );
}
