import { ILoginRequest } from "@/app/core/application/dto"; // Tipos de datos para solicitudes de inicio de sesión
import { AuthService } from "@/app/infraestructure/services/auth.service"; // Servicio para manejar la autenticación con la API
import NextAuth, { NextAuthOptions, Session } from "next-auth"; // Biblioteca NextAuth
import CredentialsProvider from "next-auth/providers/credentials"; // Proveedor de autenticación con credenciales

// Tipos personalizados para extender las funcionalidades de autenticación
interface AuthToken {
    id?: string; // ID del usuario
    token?: string; // Token de autenticación
}

interface AuthUser {
    id: string; // ID del usuario
    name: string; // Nombre del usuario
    email: string; // Correo electrónico del usuario
    token: string; // Token de autenticación
}

// Extiende la interfaz de `Session` de NextAuth
export interface CustomSession extends Session {
    user: {
        id?: string; // ID del usuario
        token?: string; // Token de autenticación
        name?: string | null; // Nombre del usuario
        email?: string | null; // Correo electrónico del usuario
        image?: string | null; // Imagen del usuario
    };
}

// Configuración principal de NextAuth
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials", // Nombre del proveedor que se muestra en la UI
            credentials: {
                username: { label: "Correo Electrónico", type: "text" }, // Campo para el nombre de usuario
                password: { label: "Contraseña", type: "password" }, // Campo para la contraseña
            },
            // Lógica para autorizar al usuario con las credenciales proporcionadas
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials.username) {
                    console.error("Credenciales faltantes");
                    return null;
                }
                const loginRequest: ILoginRequest = {
                    password: credentials.password,
                    userName: credentials.username,
                };

                try {
                    const authService = new AuthService(); // Instancia del servicio de autenticación
                    const response = await authService.login(loginRequest); // Llama a la API para autenticar al usuario

                    return {
                        email: loginRequest.userName,
                        id: loginRequest.userName,
                        name: loginRequest.userName,
                        token: response.token, // Devuelve el token de autenticación
                    } as AuthUser;
                } catch (error) {
                    console.log(error);
                    return Promise.reject(new Error(JSON.stringify(error))); // Manejo de errores
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // Usa JSON Web Tokens para manejar las sesiones
    },
    callbacks: {
        // Callback para modificar el token JWT
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id; // Agrega el ID del usuario al token
                token.token = authUser.token; // Agrega el token de autenticación
            }
            return token; // Devuelve el token modificado
        },
        // Callback para modificar la sesión
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id; // Agrega el ID del usuario a la sesión
            customSession.user.token = (token as AuthToken).token; // Agrega el token a la sesión
            return customSession; // Devuelve la sesión modificada
        },
    },
};

// Maneja los métodos GET y POST para la autenticación
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

// Este archivo configura NextAuth para manejar la autenticación en tu aplicación. Utiliza un proveedor de credenciales (CredentialsProvider) para autenticar a los usuarios con nombre de usuario y contraseña mediante el servicio AuthService.


// Explicación General
// Proveedores (providers):

// Usa el CredentialsProvider para permitir el inicio de sesión con un nombre de usuario y contraseña.
// authorize:
// Envía las credenciales del usuario a la API mediante el servicio AuthService.
// Devuelve un objeto AuthUser con la información del usuario si la autenticación es exitosa.
// Lanza un error si las credenciales son incorrectas.
// Sesiones (session):

// La estrategia de sesión es jwt:
// Usa JSON Web Tokens para manejar la autenticación.
// Permite que la sesión sea completamente stateless.
// Callbacks (callbacks):

// jwt:
// Modifica el token JWT para incluir el id y el token del usuario.
// session:
// Modifica la sesión para incluir el id y el token del usuario en la respuesta.
// Manejo de Errores:

// Si ocurre un error en authorize, lo registra en consola y lo devuelve al frontend.
// Métodos HTTP (GET y POST):

// Define los métodos HTTP para manejar solicitudes de autenticación usando NextAuth.
// Ventajas del Diseño
// Integración Completa con NextAuth:

// Aprovecha la flexibilidad de NextAuth para manejar la autenticación basada en credenciales.
// Autenticación Stateless:

// Usa tokens JWT para mantener la autenticación ligera y escalable.
// Extensibilidad:

// Los callbacks permiten personalizar el token y la sesión según las necesidades del proyecto