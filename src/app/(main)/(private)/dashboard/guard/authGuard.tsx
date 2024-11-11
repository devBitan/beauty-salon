"use client"; // Indica que este componente se ejecuta del lado del cliente

import { useSession } from 'next-auth/react'; // Hook para manejar la sesión de NextAuth
import { useRouter } from 'next/navigation'; // Hook para manejar la navegación en Next.js
import React, { useEffect } from 'react'; // Importa React y el hook useEffect

// Definición del componente
export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data, status } = useSession(); // Obtiene el estado de la sesión y los datos de usuario
    const router = useRouter(); // Maneja la navegación programática

    // Redirige al usuario a la página de inicio de sesión si no está autenticado
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login'); // Redirige al login
        }
    }, [status, data]); // Ejecuta este efecto cuando cambian el estado o los datos de la sesión

    // Renderiza el contenido si el usuario está autenticado
    if (status === 'authenticated') {
        return <>{children}</>; // Muestra los hijos si el usuario está autenticado
    }

    // Muestra un indicador de carga mientras se verifica el estado de autenticación
    if (status === 'loading') {
        return (
            <>
                <h1>Aquí iría un spinner</h1>
            </>
        );
    }

    // Si no se cumple ninguna condición, no renderiza nada
    return null;
}

// El componente AuthGuard es un contenedor de alto nivel que protege las rutas o componentes restringidos. Garantiza que solo los usuarios autenticados puedan acceder al contenido dentro de este contenedor.

// Explicación General
// Propósito del Componente:

// AuthGuard actúa como una capa de protección para rutas o componentes.
// Asegura que solo los usuarios autenticados puedan acceder al contenido.
// Redirige a los usuarios no autenticados a la página de inicio de sesión.
// Flujo de Trabajo:

// Usa useSession para obtener el estado de la sesión (authenticated, unauthenticated, o loading).
// Si el usuario no está autenticado (unauthenticated), redirige a /login.
// Mientras se verifica la autenticación (loading), muestra un indicador de carga (puedes reemplazarlo con un spinner).
// Si el usuario está autenticado (authenticated), renderiza los hijos (children).
// Hook useEffect:

// Detecta cambios en el estado de la sesión (status).
// Realiza una redirección programática usando router.push si el usuario no está autenticado.