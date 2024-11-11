import React from 'react'; // Importa React para definir componentes
import { ServicesService } from '@/app/infraestructure/services/service.service'; // Servicio para interactuar con la API de servicios
import TemplateService from '@/ui/template/templateService'; // Plantilla de UI para mostrar los servicios

// Instancia del servicio de servicios
const useServicesService = new ServicesService();

// Interfaz de las propiedades que recibe la página
interface IProps {
    searchParams: {
        page: string; // Número de la página actual
        size: string; // Cantidad de elementos por página
        name: string; // Nombre para filtrar los servicios (opcional)
    };
}

/**
 * Genera los metadatos de la página dinámicamente.
 * 
 * @param searchParams - Parámetros de búsqueda recibidos en la URL.
 * @returns Un objeto con los metadatos (título y descripción).
 */
export const generateMetadata = async ({ searchParams }: IProps) => {
    const page = searchParams.page ?? '1'; // Usa la página 1 como valor predeterminado
    return {
        title: `Services - Página ${page}`, // Título dinámico basado en el número de página
        description: 'Service of beauty-salon', // Descripción fija
    };
};

/**
 * Componente de la página de servicios.
 * 
 * @param searchParams - Parámetros de búsqueda recibidos en la URL.
 * @returns Un componente que muestra los servicios paginados.
 */
export default async function ServicesPage({ searchParams }: IProps) {
    // Obtiene los parámetros de búsqueda, con valores predeterminados
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const size = searchParams.size ? parseInt(searchParams.size) : 9;

    // Llama al servicio para obtener los datos de los servicios paginados
    const data = await useServicesService.findAll(page, size);

    // Renderiza la plantilla con los datos obtenidos
    return (
        <TemplateService data={data} title='Services' />
    );
}

// Explicación General
// Propósito del Componente:

// ServicesPage representa la página de servicios, encargándose de:
// Mostrar los servicios paginados.
// Configurar los metadatos dinámicamente basados en los parámetros de búsqueda.
// Flujo de Trabajo:

// La página recibe los parámetros de búsqueda (page, size, name) de la URL.
// Llama al servicio ServicesService para obtener los datos de los servicios correspondientes.
// Renderiza el componente TemplateService con los datos y el título configurado.
// generateMetadata:

// Genera dinámicamente el título de la página basado en el número de página actual.
// Propiedades del Componente
// searchParams
// Tipo: { page: string; size: string; name: string; }
// Parámetros de búsqueda pasados a través de la URL.
// page: Página actual.
// size: Número de elementos por página.
// name: (Opcional) Filtro por nombre del servicio.
// Servicios y Componentes Relacionados
// ServicesService.findAll:

// Llama a la API para obtener los servicios paginados.
// Devuelve un objeto con los datos de los servicios.
// TemplateService:

// Componente que muestra los servicios y controla la UI de la página.