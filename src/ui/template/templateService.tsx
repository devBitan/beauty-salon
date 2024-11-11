'use client' // Indica que este componente se ejecuta en el cliente (client-side rendering)

import React, { useState } from 'react'
import ContainerS from '../organisms/ContainerServices'; // Importa un componente de nivel Organism que probablemente renderiza los servicios
import { IPostService, IServices } from '@/app/core/application/dto'; // Importa interfaces para tipado de datos
import { toast } from 'react-toastify'; // Importa la librería para mostrar notificaciones
import { ServicesService } from '../../app/infraestructure/services/service.service'; // Servicio para interactuar con la API de servicios
import { useRouter } from 'next/navigation'; // Permite manejar navegación y recargas desde Next.js

// Interfaz para las propiedades que el componente recibe
export interface Data {
    data: IServices, // Lista o estructura de servicios que se manejarán
    title: string // Título que se mostrará en la UI
}

// Componente funcional que sirve como template para manejar servicios
const TemplateService: React.FC<Data> = ({ data, title }) => {
    const useService = new ServicesService(); // Instancia del servicio que interactúa con la API
    const [, setIsLoading] = useState(false); // Estado para indicar si está cargando (sin uso directo en la UI aquí)
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si un modal está abierto o cerrado
    const router = useRouter(); // Hook para manejar navegación y refrescos

    // Función para manejar la creación de un nuevo servicio
    const handlePostService = async (serviceData: IPostService) => {
        setIsLoading(true); // Activa el estado de carga
        try {
            await useService.create(serviceData); // Llama al servicio para crear un nuevo servicio
            toast.success("The service was added successfully"); // Muestra un mensaje de éxito
            setIsModalOpen(false); // Cierra el modal después de agregar el servicio
            router.refresh(); // Recarga los datos del servidor
        } catch (error) {
            console.error(error); // Maneja errores en consola
            toast.error("An error occurred while adding the service"); // Muestra un mensaje de error
        } finally {
            setIsLoading(false); // Desactiva el estado de carga
        }
    }

    // Función para manejar la eliminación de un servicio
    const handleDelete = async (id: number) => {
        setIsLoading(true);
        try {
            await useService.destroy(id); // Llama al servicio para eliminar un servicio
            toast.success("The service was successfully deleted");
            router.refresh(); // Recarga los datos del servidor
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the service");
        } finally {
            setIsLoading(false);
        }
    }

    // Función para manejar la edición de un servicio
    const handleEdit = async (serviceData: IPostService, id: number) => {
        setIsLoading(true);
        try {
            await useService.save(serviceData, id); // Llama al servicio para editar un servicio existente
            toast.success("The service was added successfully");
            setIsModalOpen(false); // Cierra el modal después de editar el servicio
            router.refresh(); // Recarga los datos del servidor
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the service");
        } finally {
            setIsLoading(false);
        }
    }

    // Renderiza el título y el componente ContainerS con las funciones necesarias
    return (
        <>
            <h1 className=''>{title}</h1> {/* Muestra el título del template */}
            <ContainerS
                data={data} // Lista de servicios que se pasarán al componente
                onSubmit={handlePostService} // Función para agregar un nuevo servicio
                onDelete={handleDelete} // Función para eliminar un servicio
                isModalOpen={isModalOpen} // Estado para controlar el modal
                setIsModalOpen={setIsModalOpen} // Función para actualizar el estado del modal
                onEdit={handleEdit} // Función para editar un servicio
            />
        </>
    )
}

export default TemplateService; // Exporta el componente para ser usado en otros lugares del proyecto

// Explicación General del Código
// Propósito del archivo: Este archivo define un componente "Template" que maneja la lógica y la interfaz para realizar operaciones CRUD sobre servicios de un salón.
// Arquitectura de cebolla: Este componente se encuentra en la capa de "template," lo que sugiere que se encarga de combinar la lógica de negocio y los componentes visuales.
// Atomic Design: Este archivo interactúa con un organismo (ContainerS), lo que encaja en la jerarquía de diseño atómico.
// Detalles Específicos
// Dependencias Importadas:

// ServicesService: Interactúa con la API para las operaciones CRUD.
// toast: Muestra notificaciones visuales al usuario.
// useRouter: Maneja navegación y recarga en la aplicación.
// Funciones CRUD:

// handlePostService: Crea un nuevo servicio y recarga los datos.
// handleDelete: Elimina un servicio basado en su ID.
// handleEdit: Actualiza un servicio existente basado en su ID.
// Estado Local:

// isModalOpen: Controla la apertura/cierre del modal para agregar o editar servicios.
// setIsLoading: Representa si una operación está en curso (aunque no se utiliza directamente en este archivo para renderizado).
// Integración con Componentes:

// ContainerS: Recibe los datos, funciones de manejo (CRUD), y controla el estado del modal.
