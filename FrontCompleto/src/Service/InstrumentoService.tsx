import axios from "axios";
import Instrumento from "../Entity/instrumento";

const urlBase = "http://localhost:8080/instrumento";

export async function getAll() {
    console.log("instrumento service ", await axios.get(urlBase));
    return await axios.get(urlBase);
}

export async function getById(id:any) {
    console.log("intrumento url " + urlBase + "/" + id);
    return axios.get(urlBase + "/" + id);
}

export async function getByCategoriaId(id: any) {
    console.log("intrumento url " + urlBase + "/byCategoria/" + id);
    return axios.get(urlBase + "/byCategoria/" + id);
}

export async function save(instrumento: Instrumento) {
    console.log("instrumento --> ",instrumento);
    console.log("intrumento url " + urlBase + "/" +instrumento);
    return await axios.post(urlBase, instrumento);
}

export async function update(instrumento: Instrumento, id:any) {
    console.log("intrumento url " + urlBase + "/" +instrumento);
    return await axios.put(urlBase + "/"+id, instrumento);
}

export async function borrar( id:number) {
    console.log("intrumento url " + urlBase + "/" +id);
    return await axios.delete(urlBase + "/"+id);
}