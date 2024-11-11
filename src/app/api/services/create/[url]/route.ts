import { NextResponse } from 'next/server'; // Utilidad de Next.js para manejar respuestas HTTP
import { getServerSession } from "next-auth/next"; // Obtiene la sesión del servidor con NextAuth
import { authOptions, CustomSession } from "../../../auth/[...nextauth]/route"; // Configuración de autenticación y tipos personalizados

// URL base predeterminada para las solicitudes
const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1";

/**
 * Maneja solicitudes POST autenticadas.
 * 
 * @param request - La solicitud HTTP entrante.
 * @param params - Parámetros de la URL, incluyendo la ruta relativa de la API (`url`).
 * @returns Una respuesta JSON con los datos o un mensaje de error.
 */
export async function POST(request: Request, { params }: { params: { url: string } }) {
    try {
        // Obtiene la sesión actual para verificar si el usuario está autenticado
        const session = await getServerSession(authOptions) as CustomSession;
        if (!session || !session.user.token) {
            // Devuelve un error 401 si no hay sesión o token
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Extrae el cuerpo de la solicitud
        const body = await request.json();

        // Realiza una solicitud POST a la API externa usando el token del usuario
        const response = await fetch(`${defaultBaseUrl}/${params.url}`, {
            headers: {
                'Content-Type': 'application/json', // Establece el tipo de contenido
                'Authorization': `Bearer ${session.user.token}` // Incluye el token en el encabezado de autorización
            },
            method: 'POST',
            body: JSON.stringify(body), // Serializa el cuerpo de la solicitud
        });

        // Verifica si la respuesta de la API externa no es válida
        if (!response.ok) {
            const errorData = await response.json();
            // Devuelve el error de la API externa con el código de estado correspondiente
            return NextResponse.json(errorData, { status: response.status });
        }

        // Extrae y devuelve los datos de la respuesta de la API externa
        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        // Maneja errores inesperados
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Este archivo define un manejador de solicitudes POST para realizar peticiones a una API externa con autenticación basada en next-auth.

// Explicación General
// Propósito del Manejador:

// Este manejador permite que el servidor de Next.js realice solicitudes POST autenticadas a una API externa.
// La ruta recibe:
// Un cuerpo JSON con los datos a enviar.
// Un parámetro de URL (url) para determinar el endpoint específico de la API.
// Flujo de Trabajo:

// Obtiene la sesión del usuario con getServerSession de next-auth.
// Verifica que el usuario esté autenticado y posea un token válido.
// Realiza una solicitud POST a la API externa, pasando el token en el encabezado Authorization.
// Maneja errores de la API externa o del servidor de Next.js.
// Manejo de Errores
// Autenticación Fallida:

// Si el usuario no tiene sesión o token, devuelve un error 401 Unauthorized.
// Errores de la API Externa:

// Si la API externa responde con un error (códigos HTTP 4xx o 5xx), devuelve el error y el código de estado correspondiente.
// Errores del Servidor:

// Si ocurre un error inesperado durante el procesamiento, devuelve un error 500 Internal Server Error.
