import { PAuth } from "@/app/core/application/ports"; // Interfaz que define los métodos del servicio de autenticación
import { HttpClient } from "../utils"; // Cliente HTTP reutilizable
import { ILoginRequest, ILoginResponse } from "@/app/core/application/dto"; // Tipos de datos para solicitudes y respuestas de autenticación

export class AuthService implements PAuth {
    private clientHttp: HttpClient; // Cliente HTTP para realizar solicitudes
    private baseUrl: string = "auth"; // Base URL para las rutas de autenticación

    constructor() {
        this.clientHttp = new HttpClient(); // Inicializa el cliente HTTP
    }

    /**
     * Realiza el inicio de sesión con las credenciales proporcionadas.
     * 
     * @param req - Objeto que contiene las credenciales de inicio de sesión.
     * @returns Una promesa que resuelve en un objeto `ILoginResponse` con la información de la sesión.
     */
    async login(req: ILoginRequest): Promise<ILoginResponse> {
        return this.clientHttp.post<ILoginResponse, ILoginRequest>(
            `${this.baseUrl}/login`, // URL de la API para el inicio de sesión
            req // Cuerpo de la solicitud con las credenciales
        );
    }
}

// Explicación General
// Propósito de la Clase:

// La clase AuthService centraliza las solicitudes relacionadas con la autenticación en la aplicación.
// Método Principal:

// login:
// Envía las credenciales del usuario al backend para autenticarlo.
// Retorna un objeto con información de la sesión (ILoginResponse).
// Uso del Cliente HTTP:

// HttpClient es una abstracción reutilizable para realizar solicitudes HTTP.
// En este caso, se utiliza para enviar un POST con el cuerpo de la solicitud y recibir la respuesta.
// Interfaz Implementada (PAuth):

// La clase implementa una interfaz que define los métodos que debe tener cualquier servicio de autenticación.
// Esto permite seguir principios de programación orientada a interfaces y facilita la extensibilidad.