import axios from "axios";
import Usuario from "../Entity/usuario";

const urlBase = "http://localhost:8080/Usuario";


export async function save(usuario: Usuario) {
    console.log("usuario --> ",usuario);
    console.log("usuario url " + urlBase + "/" +usuario);
    return await axios.post(urlBase, usuario);
}

export async function isAuthenticated(username: string, password: string): Promise<{ isAuthenticated: boolean, role?: string }> {
    try {
        const response = await axios.get(`${urlBase}/existByNameClave`, {
            params: {
                nombre: username,
                clave: password
            }
        });

        if (response.data && response.data.rol) {
            return { isAuthenticated: true, role: response.data.rol };
        } else {
            return { isAuthenticated: false };
        }
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        return { isAuthenticated: false };
    }
}