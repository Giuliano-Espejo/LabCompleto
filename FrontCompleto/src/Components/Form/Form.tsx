import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById, update, save } from "../../Service/InstrumentoService";
import { getAllCategoria } from "../../Service/CategoriaService";
import Instrumento from "../../Entity/instrumento";
import "./Form.css";
import Categoria from "../../Entity/categoria";

export default function Form() {
    let { id } = useParams();
    let navigate = useNavigate();

    const [instrumento, setInstrumento] = useState<Instrumento>({
        id: 0,
        instrumento: '',
        marca: '',
        modelo: '',
        imagen: '',
        precio: 0,
        costoEnvio: '',
        cantidadVendida: 0,
        descripcion: '',
        cantidad: 0,
        categoria: null
    });
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id !== "0") {
                    const response = await getById(id);
                    if (response.data) {
                        setInstrumento(response.data);
                        const response2 = await getAllCategoria();
                        setCategorias(response2.data);
                    } else {
                        console.log("La respuesta no contiene un instrumento:", response.data);
                    }
                } else {
                    const response2 = await getAllCategoria();
                    setCategorias(response2.data);
                    setInstrumento(prevState => ({
                        ...prevState,
                        categoria: response2.data[0] // Establecer la primera categoría como valor predeterminado
                    }));
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "categoria") {
            const selectedCategoria = categorias.find(categoria => categoria.denominacion === value);
            setInstrumento(prevState => ({
                ...prevState,
                categoria: selectedCategoria || categorias[0] 
            }));
        } else {
            setInstrumento(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id === "0") {
                await save(instrumento);
            } else {
                await update(instrumento, id);
            }
            navigate(-1);
        } catch (error) {
            window.alert("Error al guardar instrumento")
            console.error("Error al guardar el instrumento:", error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="instrumento" value={instrumento.instrumento} onChange={handleChange} placeholder="Instrumento" />
                <input type="text" name="marca" value={instrumento.marca} onChange={handleChange} placeholder="Marca" />
                <input type="text" name="modelo" value={instrumento.modelo} onChange={handleChange} placeholder="Modelo" />
                <input type="text" name="imagen" value={instrumento.imagen} onChange={handleChange} placeholder="Imagen" />
                <input type="number" name="precio" value={instrumento.precio} onChange={handleChange} placeholder="Precio" />
                <input type="text" name="costoEnvio" value={instrumento.costoEnvio} onChange={handleChange} placeholder="Costo de Envio" />
                <input type="number" name="cantidadVendida" value={instrumento.cantidadVendida} onChange={handleChange} placeholder="Cantidad Vendida" />
                <input type="text" name="descripcion" value={instrumento.descripcion} onChange={handleChange} placeholder="Descripcion" />
                <select name="categoria" value={instrumento.categoria ? instrumento.categoria.denominacion : ''} onChange={handleChange} aria-placeholder="Categoria">
                    <optgroup label="Categoria">
                        {categorias.map((categoria: Categoria) => (
                            <option key={categoria.id} value={categoria.denominacion}> {categoria.denominacion}</option>
                        ))}
                    </optgroup>
                </select>
                <button type="submit" className={id === "0" ? 'btn btn-success' : 'btn btn-warning'}>{id === "0" ? 'Agregar' : 'Editar'}</button>
            </form>
        </div>
    );
}
