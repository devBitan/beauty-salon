import { IPostService, IServices } from "@/app/core/application/dto/services/services-response.dto"; // Tipos de datos para servicios
import { HttpClient } from "../utils/client-http"; // Cliente HTTP reutilizable

export class ServicesService {
    private httpClient: HttpClient; // Instancia del cliente HTTP

    constructor() {
        this.httpClient = new HttpClient(); // Inicializa el cliente HTTP
    }

    /**
     * Encuentra todos los servicios paginados.
     * 
     * @param page - Número de página para la paginación.
     * @param size - Tamaño de la página (cantidad de elementos por página).
     * @returns Una promesa que resuelve en un objeto de tipo `IServices`.
     */
    async findAll(page: number, size: number): Promise<IServices> {
        try {
            const response = await this.httpClient.get<IServices>(`services?page=${page}&size=${size}`);
            return response; // Retorna la respuesta de la API
        } catch (error) {
            console.log(error);
            throw error; // Lanza el error para manejarlo en la capa superior
        }
    }

    /**
     * Crea un nuevo servicio.
     * 
     * @param service - Objeto con los datos del servicio a crear.
     * @returns Una promesa que resuelve en los datos del servicio creado.
     */
    async create(service: IPostService) {
        try {
            const response = await fetch(`/api/services/create/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Especifica que el cuerpo es JSON
                },
                body: JSON.stringify(service), // Serializa los datos a JSON
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error); // Lanza el mensaje de error si la respuesta no es válida
            }

            const data = await response.json();
            return data; // Retorna los datos del servicio creado
        } catch (error) {
            console.error(error);
            throw error; // Lanza el error para manejarlo en la capa superior
        }
    }

    /**
     * Elimina un servicio por su ID.
     * 
     * @param id - ID del servicio a eliminar.
     */
    async destroy(id: number) {
        try {
            const response = await fetch(`/api/services/destroy/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error); // Lanza el mensaje de error si la respuesta no es válida
            }
        } catch (error) {
            console.error(error);
            throw error; // Lanza el error para manejarlo en la capa superior
        }
    }

    /**
     * Actualiza un servicio existente.
     * 
     * @param service - Objeto con los datos actualizados del servicio.
     * @param id - ID del servicio a actualizar.
     * @returns Una promesa que resuelve en los datos del servicio actualizado.
     */
    async save(service: IPostService, id: number) {
        try {
            const response = await fetch(`/api/services/save/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service), // Serializa los datos a JSON
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error); // Lanza el mensaje de error si la respuesta no es válida
            }

            const data = await response.json();
            return data; // Retorna los datos del servicio actualizado
        } catch (error) {
            console.error(error);
            throw error; // Lanza el error para manejarlo en la capa superior
        }
    }
}

// xplicación General
// Propósito de la Clase:

// ServicesService proporciona una interfaz para realizar operaciones CRUD en los servicios de la aplicación.
// Centraliza las solicitudes HTTP relacionadas con los servicios.
// Métodos Principales:

// findAll: Recupera servicios paginados desde la API.
// create: Crea un nuevo servicio con los datos proporcionados.
// destroy: Elimina un servicio por su ID.
// save: Actualiza los datos de un servicio existente.
// Uso del Cliente HTTP (HttpClient):

// El método findAll utiliza un cliente HTTP genérico (HttpClient) para obtener servicios.
// Los métodos create, destroy, y save utilizan fetch directamente para manejar las solicitudes.
// Manejo de Errores:

// Si una respuesta no es válida (!response.ok), lanza un error con el mensaje proporcionado por la API.
// Los errores son capturados y logueados en consola, pero se vuelven a lanzar para que puedan ser manejados en la capa superior.
// Estructura de Datos
// IPostService: Representa los datos necesarios para crear o actualizar un servicio.
// IServices: Representa la respuesta de una lista paginada de servicios.
// Ventajas
// Centralización:

// Todo el manejo de datos relacionados con los servicios está en una única clase, lo que facilita su mantenimiento.
// Reutilización:

// El cliente HTTP (HttpClient) permite reutilizar la lógica para solicitudes GET, POST, etc.
// Flexibilidad:

// Puedes cambiar la implementación del cliente HTTP en un solo lugar si es necesario