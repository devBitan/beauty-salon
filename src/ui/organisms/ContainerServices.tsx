'use client' // Este archivo se ejecuta en el cliente (client-side rendering)

import { IPostService, IServices } from "@/app/core/application/dto"; // Importa las interfaces para tipar servicios y peticiones
import CardS from "../molecules/common/CardS"; // Componente que representa una tarjeta para cada servicio
import Pagination from "../molecules/common/Pagination"; // Componente de paginación
import { useState } from "react"; // Hook de React para manejar estados locales
import { BookmarkPlus } from "lucide-react"; // Icono para la acción de agregar servicio
import { PostServiceModal } from "../molecules/common/newServiceForm"; // Modal para agregar o editar servicios

// Propiedades esperadas para el componente ContainerS
interface IResponse {
    data: IServices; // Datos de los servicios paginados
    onEdit: (data: IPostService, id: number) => void; // Función para manejar la edición de servicios
    onDelete: (id: number) => void; // Función para manejar la eliminación de servicios
    onSubmit: (data: IPostService) => Promise<void>; // Función para manejar la creación de servicios
    isModalOpen: boolean; // Estado para determinar si el modal está abierto
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Función para cambiar el estado del modal
}

// Componente que representa un contenedor para manejar la lista de servicios y sus acciones
const ContainerS: React.FC<IResponse> = ({ data, onDelete, onSubmit, isModalOpen, setIsModalOpen, onEdit }) => {
    // Estado local para manejar el modo del modal ('add' para agregar, 'edit' para editar)
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    // Estado para almacenar el ID del servicio seleccionado en modo de edición
    const [selectedId, setSelectedId] = useState<number | null>(null);
    // Estado para almacenar los datos del servicio seleccionado
    const [selectedService, setSelectedService] = useState<IPostService | null>(null);

    // Función para abrir el modal en modo 'add' o 'edit'
    const handleOpenModal = (mode: 'add' | 'edit', id?: number) => {
        setModalMode(mode); // Define el modo del modal
        if (id) {
            const service = data.content.find(item => item.id === id); // Busca el servicio por ID
            if (service) {
                setSelectedService(service); // Almacena los datos del servicio seleccionado
            }
            setSelectedId(id); // Almacena el ID del servicio
        } else {
            setSelectedService(null); // Limpia el servicio si el modo es 'add'
        }
        setIsModalOpen(true); // Abre el modal
    };

    // Función para cerrar el modal y limpiar el estado relacionado
    const handleCloseModal = () => {
        setIsModalOpen(false); // Cierra el modal
        setSelectedId(null); // Limpia el ID seleccionado
        setSelectedService(null); // Limpia los datos del servicio seleccionado
    };

    // Función para manejar el envío de datos desde el modal
    const handleSubmit = (data: IPostService) => {
        if (modalMode === 'add') {
            onSubmit(data); // Llama a la función de creación si está en modo 'add'
        } else if (modalMode === 'edit' && selectedId !== null) {
            onEdit(data, selectedId); // Llama a la función de edición si está en modo 'edit'
        }
    };

    return (
        <div className="service-container">
            {/* Botón para agregar un nuevo servicio */}
            <div className="add-data-container">
                <button className="btn-generic" onClick={() => handleOpenModal('add')}>
                    <BookmarkPlus /> Add Service
                </button>
                {/* Modal para agregar o editar servicios */}
                <PostServiceModal
                    isOpen={isModalOpen} // Estado que controla si el modal está abierto
                    onClose={handleCloseModal} // Función para cerrar el modal
                    onSubmit={handleSubmit} // Función para manejar el envío de datos
                    initialData={selectedService} // Datos iniciales del servicio (si existe)
                />
            </div>
            {/* Renderiza las tarjetas de los servicios */}
            <div className="service-cards-container">
                {data.content.map((item) => (
                    <CardS 
                        key={item.id} 
                        data={item} 
                        onEdit={() => handleOpenModal('edit', item.id)} // Abre el modal en modo 'edit'
                        onDelete={onDelete} // Llama a la función de eliminación
                    />
                ))}
            </div>
            {/* Componente de paginación */}
            <Pagination data={data} />
        </div>
    );
};

export default ContainerS; // Exporta el componente para ser utilizado en otros lugares



// Explicación General
// Propósito del Componente: Este componente actúa como un contenedor principal para manejar una lista de servicios. Permite a los usuarios agregar, editar y eliminar servicios mediante un modal interactivo y tarjetas individuales.

// Flujo de Lógica:

// El usuario hace clic en "Add Service" o en "Edit" para abrir el modal.
// Dependiendo del modo (add o edit), el modal muestra datos en blanco o precargados.
// Al enviar el formulario, llama a onSubmit o onEdit según el caso.
// Las tarjetas permiten eliminar servicios directamente mediante onDelete.
// Componentes Integrados:

// CardS: Representa cada servicio como una tarjeta.
// PostServiceModal: Modal utilizado para agregar o editar servicios.
// Pagination: Maneja la paginación de los servicios listados