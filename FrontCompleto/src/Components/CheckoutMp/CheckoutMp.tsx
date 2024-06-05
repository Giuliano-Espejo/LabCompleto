//import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPreferenceMP } from '../../Service/MPService';
import { useState } from 'react';
import { save } from '../../Service/PedidoService';
import PreferenceMP from '../../Entity/preferenceMP';
import { useCarrito } from '../../hooks/useCarrito';
import Pedido from '../../Entity/pedido';
import { Button } from 'react-bootstrap';

function CheckoutMP() {
    const { cart, limpiarCarrito, totalPedido } = useCarrito();
    const [idPreference, setIdPreference] = useState<string>('');

    const guardarPedido = async (): Promise<Pedido | null> => {
        if (!totalPedido || totalPedido <= 0) {
            alert('El total del pedido debe ser mayor a 0 para guardar.');
            return null;
        }

        const pedido: Pedido = { totalPedido };
        try {
            const pedidoGuardado = await save(pedido, cart);
            alert('Pedido guardado con éxito');
            console.log("Pedido guardado: ", pedidoGuardado);
            return pedidoGuardado;
        } catch (error) {
            console.error('Error al guardar el pedido:', error);
            alert('Hubo un error al guardar el pedido');
            return null;
        }
    };

    const getPreferenceMP = async () => {
        const pedidoGuardado = await guardarPedido();
        if (pedidoGuardado) {
            try {
                const response: PreferenceMP = await createPreferenceMP(pedidoGuardado);
                console.log("Preference ID: ", response.id);
                if (response) {
                    setIdPreference(response.id);
                    limpiarCarrito();
                    return response.id; // Retornando el idPreference
                }
            } catch (error) {
                console.error('Error al crear la preferencia de Mercado Pago:', error);
                alert('Hubo un error al crear la preferencia de Mercado Pago');
                return null;
            }
        } else {
            alert("Agregue al menos un instrumento al carrito");
            return null;
        }
    }


    //initMercadoPago('TEST-2bbca99c-f003-4787-b8c2-6282d340d911', { locale: 'es-AR' });

    const handleCompra = async () => {
        const preferenceId = await getPreferenceMP();
        if (totalPedido != 0) {
            setTimeout(() => {
                console.log("preference en handleCompra ", preferenceId);
                const url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`;
                window.open(url, '_blank');
                limpiarCarrito();
            }, 2000);
        }else{
            console.log("El carrito esta vacio");
        }

    }

    return (
        <div>
            {/* <button onClick={getPreferenceMP} className='btMercadoPago'>COMPRAR con <br /> Mercado Pago</button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
            </div> */}
            <Button onClick={() => handleCompra()} className='primary'> Compra con Mercado Pago</Button>
        </div>
    );
}

export default CheckoutMP;
