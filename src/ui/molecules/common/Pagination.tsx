"use client"; // Este archivo se ejecuta en el cliente (client-side rendering)

import { IServices } from "@/app/core/application/dto/services/services-response.dto"; // Importa la interfaz para tipar los datos del servicio
import { useRouter, useSearchParams } from "next/navigation"; // Hooks para manejar navegación y parámetros de consulta en Next.js
import React from "react";
import { StepBack, StepForward } from "lucide-react"; // Iconos para los botones de navegación

// Interfaz para las propiedades esperadas por el componente
interface IProps {
    data: IServices; // Datos de los servicios, que incluyen información de paginación
}

// Componente funcional que maneja la lógica y el UI de la paginación
function Pagination({ data }: IProps) {
    const router = useRouter(); // Hook para manejar la navegación programática
    const searchParams = useSearchParams(); // Hook para manejar los parámetros de consulta de la URL

    // Función para manejar el cambio de página
    const onPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString()); // Clona los parámetros actuales
        params.set("page", newPage.toString()); // Establece el número de la nueva página

        router.push(`?${params.toString()}`); // Redirige a la nueva URL con los parámetros actualizados
    };

    // Calcula el número de la página actual basado en los datos de `data`
    const currentPage = data.pageable.pageNumber + 1;

    // Clases CSS reutilizables para los botones
    const buttonStyles = "text-blue-500 hover:text-blue-600 focus:outline-none transition-colors";
    const disabledButtonStyles = "text-gray-400 hover:text-gray-400 cursor-not-allowed";

    return (
        <div className="pagination-container">
            {/* Botón para ir a la página anterior */}
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} // Deshabilita si es la primera página
                className={`${buttonStyles} ${currentPage === 1 && disabledButtonStyles}`} // Aplica estilos condicionales
            >
                <StepBack /> {/* Icono de retroceso */}
            </button>
            {/* Información de la página actual y el total */}
            <span>Page</span>
            <span> {currentPage}</span>
            <span> of </span>
            <span> {data.totalPages}</span>
            {/* Botón para ir a la página siguiente */}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === data.totalPages} // Deshabilita si es la última página
                className={`${buttonStyles} ${currentPage === data.totalPages && disabledButtonStyles}`} // Aplica estilos condicionales
            >
                <StepForward /> {/* Icono de avance */}
            </button>
        </div>
    );
}

export default Pagination; // Exporta el componente para ser utilizado en otros lugares


// Explicación General
// Propósito del Componente: Este componente maneja la lógica de paginación para listas de datos paginados, permitiendo a los usuarios navegar entre las páginas de los servicios.

// Lógica de Navegación:

// Usa los hooks useRouter y useSearchParams de Next.js para manejar navegación y parámetros de consulta.
// Calcula el número de la página actual basado en los datos de paginación (data.pageable.pageNumber).
// Al hacer clic en los botones de navegación, actualiza los parámetros de consulta en la URL y redirige a la nueva página.
// Detalles Específicos
// Props del Componente:

// data:
// Contiene la información de los servicios, incluyendo detalles de paginación como pageable.pageNumber (número de página actual) y totalPages (total de páginas).
// Funciones Internas:

// onPageChange: Maneja la actualización de los parámetros de la URL para reflejar la nueva página y redirige usando router.push.
// Estilos Condicionales:

// Botones de navegación (<button>):
// Si el botón está deshabilitado (primera o última página), aplica estilos específicos (disabledButtonStyles).
// Uso de Iconos:

// StepBack y StepForward: Representan las acciones de retroceso y avance.
// Flujo de Trabajo
// Navegación entre Páginas:

// Al hacer clic en los botones, onPageChange actualiza los parámetros de la URL.
// El navegador redirige a la nueva página y obtiene los datos correspondientes.
// Desactivación de Botones:

// Si el usuario está en la primera página, el botón de retroceso se desactiva.
// Si el usuario está en la última página, el botón de avance se desactiva