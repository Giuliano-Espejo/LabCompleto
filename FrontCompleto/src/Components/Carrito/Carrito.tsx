import Instrumento from '../../Entity/instrumento';
import { useCarrito } from '../../hooks/useCarrito';
import { save } from '../../Service/PedidoService';
import Pedido from '../../Entity/pedido'; // Asegúrate de importar Pedido
import CheckoutMP from '../CheckoutMp/CheckoutMp';

function CartItem (item: Instrumento) {
  return (
    <div key={item.id}>
      <span>
        <img width={50} height={50} src={item.imagen} alt={item.instrumento} />
        <div>
          <strong>{item.instrumento}</strong> - ${item.precio}
        </div>
        <div>
          <b>{item.cantidad} {item.cantidad === 1 ? 'unidad' : 'unidades'}</b>
        </div>
      </span>
      <hr />
    </div>
  );
}

export function Carrito () {
  const { cart, addCarrito, limpiarCarrito, totalPedido } = useCarrito();

  const mostrarCarritoJSON = () => {
    console.log(cart);
  }

  // const guardarPedido = async () => {
  //   if (!totalPedido || totalPedido <= 0) {
  //     alert('El total del pedido debe ser mayor a 0 para guardar.');
  //     return;
  //   }

  //   const pedido: Pedido = { totalPedido }; 
  //   try {
  //     await save(pedido, cart);
  //     alert('Pedido guardado con éxito');
  //     limpiarCarrito();
  //   } catch (error) {
  //     console.error('Error al guardar el pedido:', error);
  //     alert('Hubo un error al guardar el pedido');
  //   }
  // }

  return (
    <>
      <aside className='cart'>
        <ul>
          {cart.map((Instrumento: Instrumento, index) => 
            <CartItem 
              id={Instrumento.id} 
              instrumento={Instrumento.instrumento} 
              precio={Instrumento.precio} 
              key={index}
              imagen={Instrumento.imagen} 
              descripcion={Instrumento.descripcion} 
              cantidad={Instrumento.cantidad} 
              marca={Instrumento.marca} 
              modelo={Instrumento.modelo} 
              costoEnvio={Instrumento.costoEnvio} 
              cantidadVendida={Instrumento.cantidadVendida}
              categoria={Instrumento.categoria} 
              addCarrito={() => addCarrito(Instrumento)}
            />
          )}
        </ul>
        <div>
          <h3>${totalPedido}</h3>
        </div>

        <button onClick={limpiarCarrito} title='Limpiar Todo'>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17a2 2 0 1 0 2 2' />
            <path d='M17 17h-11v-11' />
            <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
            <path d='M3 3l18 18' />
          </svg>
        </button>
        <br />
        <button onClick={mostrarCarritoJSON}>
          MOSTRAR CART JSON
        </button>
        <CheckoutMP />
        <br />        
      </aside>
    </>
  );
}
