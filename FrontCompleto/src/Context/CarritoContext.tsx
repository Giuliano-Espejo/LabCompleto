import { ReactNode, createContext, useState } from 'react';
import Instrumento from '../Entity/instrumento';

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: Instrumento[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
  totalPedido?: number;
}

// Crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  totalPedido: 0,
});

// Crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Instrumento[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);

  const addCarrito = async (product: Instrumento) => {
    console.log(product);

    let existe: boolean = false;
    cart.forEach((element: Instrumento) => {
      if (element.id === product.id) {
        existe = true;
        return existe;
      }
    });

    console.log(existe);

    if (existe) {
      console.log("YA EXISTE");

      const productCarrito = cart.find((item) => item.id === product.id);

      if (productCarrito) {
        const updatedProduct = { ...productCarrito, cantidad: productCarrito.cantidad + 1 };
        const cartClonado = structuredClone(cart.filter(item => item.id !== product.id));
        cartClonado.push(updatedProduct);
        setCart(cartClonado);
        calcularTotalCarritoCustom(cartClonado);
      }
    } else {
      console.log("NO EXISTE");
      const newProduct = { ...product, cantidad: 1 };
      const cartClonado = [...cart, newProduct];
      setCart(cartClonado);
      calcularTotalCarritoCustom(cartClonado);
    }
  };

  const removeCarrito = async (product: Instrumento) => {
    const cartClonado = structuredClone(cart.filter(item => item.id !== product.id));
    setCart(cartClonado);
    calcularTotalCarritoCustom(cartClonado);
  };

  const removeItemCarrito = async (product: Instrumento) => {
    let existe: boolean = false;
    cart.forEach((element: Instrumento) => {
      if (element.id === product.id) {
        existe = true;
      }
    });

    if (existe) {
      console.log("EXISTE");
      const productCarrito = cart.find((item) => item.id === product.id);

      if (productCarrito) {
        if (productCarrito.cantidad > 1) {
          const updatedProduct = { ...productCarrito, cantidad: productCarrito.cantidad - 1 };
          const cartClonado = structuredClone(cart.filter(item => item.id !== product.id));
          cartClonado.push(updatedProduct);
          setCart(cartClonado);
          calcularTotalCarritoCustom(cartClonado);
        } else {
          const cartClonado = cart.filter(item => item.id !== product.id);
          setCart(cartClonado);
          calcularTotalCarritoCustom(cartClonado);
        }
      }
    }
  };

  const limpiarCarrito = () => {
    setCart([]);
    setTotalPedido(0);
  };

  const calcularTotalCarrito = async () => {
    let total: number = 0;
    console.log(cart);
    cart.forEach((element: Instrumento) => {
      console.log(element);
      total += element.precio * element.cantidad;
    });
    await setTotalPedido(total);
  };

  const calcularTotalCarritoCustom = async (cartCustom: Instrumento[]) => {
    let total: number = 0;
    console.log(cartCustom);
    cartCustom.forEach((element: Instrumento) => {
      console.log(element);
      total += element.precio * element.cantidad;
    });
    await setTotalPedido(total);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
  );
}
