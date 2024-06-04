import axios from "axios";
import Categoria from "../Entity/categoria";

const urlBase = "http://localhost:8080/categoria";

export async function getAllCategoria() {
    console.log("instrumento service ", await axios.get(urlBase));
    return await axios.get(urlBase);
}

export async function getById(id: number) {
    console.log("intrumento url " + urlBase + "/" + id);
    return axios.get(urlBase + "/" + id);
}

export async function save(categoria: Categoria) {
    console.log("intrumento url " + urlBase + "/" +categoria);
    return await axios.post(urlBase, categoria);
}

export async function update(categoria: Categoria, id:number) {
    console.log("intrumento url " + urlBase + "/" +categoria);
    return await axios.put(urlBase + "/"+id, categoria);
}

export async function borrar( id:number) {
    console.log("intrumento url " + urlBase + "/" +id);
    return await axios.delete(urlBase + "/"+id);
}