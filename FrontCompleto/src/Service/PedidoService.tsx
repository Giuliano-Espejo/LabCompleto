import axios from "axios";
import pedido from "../Entity/pedido";

const urlBase = "http://localhost:8080/pedido";

export async function save(ped: pedido, detalle: any[]): Promise<pedido> {
    const pedidoCompleto = {
        totalPedido: ped.totalPedido,
        pedidosDetalle: detalle.map(detalles => {
            return {
                cantidad: detalles.cantidad,
                idInstrumento: detalles.id
            }
        })
    };

    console.log("pedido --> ", pedidoCompleto);
    console.log("instrumento url " + urlBase + "/" + pedidoCompleto);

    try {
        const response = await axios.post(urlBase, pedidoCompleto, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error saving the pedido:', error);
        throw error;
    }
}

export async function pedidoGruped() {
    return (await axios.get(urlBase + "/grouped")).data;
}

export async function pedidoGroupedByInstrument() {
    return (await axios.get(urlBase + '/groupedByInstrument')).data;
  }