import Categoria from "./categoria";
import { ChangeEventHandler } from "react";

export default interface Instrumento{
    id:number;
    instrumento:string;
    marca:string;
    modelo:string;
    imagen:string;
    precio:number;
    costoEnvio:string;
    cantidadVendida:number;
    descripcion:string;
    categoria:Categoria | null
    cantidad:number;
    addCarrito?:ChangeEventHandler;
    
}
