import axios from 'axios';
import Pedido from "../Entity/pedido";
import PreferenceMP from '../Entity/preferenceMP';

export async function createPreferenceMP(pedido?: Pedido): Promise<PreferenceMP> {
    const urlServer = 'http://localhost:8080/apiMp';
    try {
        const response = await axios.post(urlServer, pedido, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data as PreferenceMP;
    } catch (error) {
        console.error('Error creating preference:', error);
        throw error; // Re-throw the error after logging it
    }
}
