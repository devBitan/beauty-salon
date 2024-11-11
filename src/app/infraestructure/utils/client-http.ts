import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route"; // Opciones de configuración de next-auth
import { getServerSession } from "next-auth/next"; // Función para obtener la sesión del lado del servidor

const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1"; // URL base por defecto para las solicitudes

export class HttpClient {
    private baseUrl: string; // URL base para las solicitudes HTTP

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || defaultBaseUrl; // Usa la URL base proporcionada o la predeterminada
    }

    /**
     * Genera los encabezados para las solicitudes HTTP.
     * Incluye el token de autenticación si el usuario está autenticado.
     * 
     * @returns Un objeto con los encabezados de la solicitud.
     */
    private async getHeader(): Promise<Record<string, string>> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json", // Indica que el cuerpo de la solicitud es JSON
        };

        // Obtiene la sesión actual para agregar el token de autenticación si existe
        const session = await getServerSession(authOptions) as CustomSession;
        if (session && session.user.token) {
            headers["Authorization"] = `Bearer ${session.user.token}`;
        }

        return headers;
    }

    /**
     * Maneja la respuesta de una solicitud HTTP.
     * Si la respuesta no es válida (código no 2xx), lanza un error.
     * 
     * @param response - La respuesta de la solicitud HTTP.
     * @returns Los datos de la respuesta parseados como JSON.
     */
    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json(); // Extrae los datos del error
            throw errorData; // Lanza el error para manejarlo en la capa superior
        }
        return await response.json(); // Devuelve los datos de la respuesta
    }

    /**
     * Realiza una solicitud HTTP GET.
     * 
     * @param url - La URL relativa para la solicitud.
     * @returns Una promesa que resuelve en los datos de la respuesta.
     */
    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "GET",
            cache: "no-store", // Desactiva la caché para obtener siempre los datos más recientes
        });
        return this.handleResponse(response);
    }

    /**
     * Realiza una solicitud HTTP DELETE.
     * 
     * @param url - La URL relativa para la solicitud.
     * @returns Una promesa que resuelve en los datos de la respuesta.
     */
    async delete<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "DELETE",
        });
        return this.handleResponse(response);
    }

    /**
     * Realiza una solicitud HTTP POST.
     * 
     * @param url - La URL relativa para la solicitud.
     * @param body - Los datos a enviar en el cuerpo de la solicitud.
     * @returns Una promesa que resuelve en los datos de la respuesta.
     */
    async post<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body), // Serializa el cuerpo como JSON
        });
        return this.handleResponse(response);
    }

    /**
     * Realiza una solicitud HTTP PUT.
     * 
     * @param url - La URL relativa para la solicitud.
     * @param body - Los datos a enviar en el cuerpo de la solicitud.
     * @returns Una promesa que resuelve en los datos de la respuesta.
     */
    async put<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(body), // Serializa el cuerpo como JSON
        });
        return this.handleResponse(response);
    }
}

// Explicación General
// Propósito de la Clase:

// HttpClient simplifica la interacción con el backend, proporcionando métodos genéricos para realizar solicitudes HTTP (GET, POST, PUT, DELETE).
// Integra autenticación usando el token de la sesión actual de next-auth.
// Métodos Principales:

// getHeader: Genera los encabezados para las solicitudes, incluyendo el token JWT si el usuario está autenticado.
// handleResponse: Maneja la respuesta de la API, lanzando un error si la respuesta no es válida.
// get, post, put, delete: Métodos genéricos para realizar solicitudes HTTP.
// Autenticación:

// Utiliza getServerSession de next-auth para obtener la sesión del usuario.
// Agrega el token de autenticación en el encabezado Authorization si está disponible.
