import { Button, Card } from "react-bootstrap";
import { useCarrito } from "../../hooks/useCarrito";
import InstrumentoE from "../../Entity/instrumento";

export default function Instrumento(instrumento: InstrumentoE) {
    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();

    const verificaProductoEnCarrito = (product: InstrumentoE) => {
        return cart.some(item => item.id === product.id);
    };

    return (
        <div className="card-container">
            <Card>
                <img src={instrumento.imagen} alt={instrumento.instrumento} width={300}/>
                <div className="info">
                    <h3>{instrumento.instrumento}</h3>
                    <strong style={{ fontSize: "larger" }}>$ {instrumento.precio}</strong>
                    {instrumento.costoEnvio === "G" ? (
                        <div id="gratis">
                            <img src="/img/camion.png" alt="Envío Gratis" />
                            <p style={{ color: "#509920" }}> Envío gratis a todo el país</p>
                        </div>
                    ) : (
                        <p style={{ color: "orange" }}>Costo de envío al interior de Argentina: ${instrumento.costoEnvio}</p>
                    )}
                    <p>{instrumento.cantidadVendida} vendidos</p>
                </div>
                <p>
                    <Button variant="primary" onClick={() => removeItemCarrito(instrumento)}>-</Button>
                    <Button variant="primary" className='boton' onClick={() => {
                        verificaProductoEnCarrito(instrumento)
                            ? removeCarrito(instrumento)
                            : addCarrito(instrumento);
                    }}>
                        {
                            verificaProductoEnCarrito(instrumento)
                                ? <span style={{ fontSize: '20px', width: "20px", height: "20px" }} className={"material-symbols-outlined"}>Eliminar</span>
                                : <span style={{ fontSize: '20px', width: "20px", height: "20px" }} className={"material-symbols-outlined"}>Agregar</span>
                        }
                    </Button>
                    <Button variant="primary" onClick={() => {
                        console.log("addCarrito");
                        addCarrito(instrumento);
                    }}>+</Button>
                </p>
            </Card>
        </div>
    );
}
