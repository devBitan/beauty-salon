'use client'; // Este archivo se ejecuta en el cliente (client-side rendering)

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form"; // Manejo de formularios controlados
import { yupResolver } from "@hookform/resolvers/yup"; // Integración de Yup con React Hook Form
import * as yup from "yup"; // Biblioteca para validaciones de esquemas
import { IPostService } from "@/app/core/application/dto/services/services-response.dto"; // Tipos de datos para el servicio

// Esquema de validación para el formulario usando Yup
const postServiceSchema = yup.object().shape({
    name: yup.string().required("The name is required"),
    description: yup
        .string()
        .min(10, "The description must be at least 10 characters long")
        .required("The description is required"),
    price: yup
        .number()
        .positive("The price must be a positive number")
        .required("The price is required"),
});

// Propiedades esperadas para el componente `PostServiceModal`
interface PostServiceModalProps {
    isOpen: boolean; // Define si el modal está abierto
    onClose: () => void; // Función para cerrar el modal
    onSubmit: (data: IPostService) => void; // Función para manejar el envío de datos
    initialData?: IPostService | null; // Datos iniciales (en caso de edición)
}

// Componente funcional que representa el modal para agregar o editar un servicio
export const PostServiceModal: React.FC<PostServiceModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el estado de carga

    // Configuración de React Hook Form
    const {
        control, // Controlador para conectar los inputs al formulario
        handleSubmit, // Maneja el evento de envío
        formState: { errors }, // Errores de validación
        reset, // Función para reiniciar el formulario
    } = useForm<IPostService>({
        mode: "onChange", // Valida conforme cambian los datos
        resolver: yupResolver(postServiceSchema), // Resuelve el esquema de validación
    });

    // Restaura los valores iniciales cuando el modal se abre con datos predefinidos
    React.useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    // Manejo del envío de datos
    const handlePostService = async (data: IPostService) => {
        setIsLoading(true); // Activa el estado de carga
        try {
            await onSubmit(data); // Llama a la función de envío pasada como prop
            reset(); // Reinicia los valores del formulario
            onClose(); // Cierra el modal
        } catch (error) {
            console.error(error); // Maneja errores en consola
        } finally {
            setIsLoading(false); // Desactiva el estado de carga
        }
    };

    // Si el modal no está abierto, no renderiza nada
    if (!isOpen) return null;

    return (
        <div className="modal-container">
            <div className="modal-content">
                {/* Cabecera del modal */}
                <div className="modal-header">
                    <h2>{initialData ? "Edit Service" : "Add Service"}</h2> {/* Cambia el título según si es edición o creación */}
                    <button
                        onClick={onClose}
                        className="close-button"
                        aria-label="Close modal"
                    >
                        Close
                    </button>
                </div>
                {/* Formulario para agregar o editar un servicio */}
                <form onSubmit={handleSubmit(handlePostService)} className="modal-form">
                    {/* Campo: Nombre del Servicio */}
                    <div>
                        <label htmlFor="name">Service Name</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="name"
                                    className="w-full text-gray-300"
                                    placeholder="Enter the service name"
                                />
                            )}
                        />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>
                    {/* Campo: Descripción */}
                    <div>
                        <label htmlFor="description">Description</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="Enter a description"
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.description && <p className="error-message">{errors.description.message}</p>}
                    </div>
                    {/* Campo: Precio */}
                    <div>
                        <label htmlFor="price">Price</label>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full"
                                    placeholder="Enter the service price"
                                />
                            )}
                        />
                        {errors.price && <p className="error-message">{errors.price.message}</p>}
                    </div>
                    {/* Botón de Enviar */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-500 focus:outline-none"
                            } transition-colors`}
                    >
                        {isLoading ? "Saving..." : initialData ? "Save Changes" : "Add Service"}
                    </button>
                </form>
            </div>
        </div>
    );
};


// Explicación General
// Propósito del Componente:

// PostServiceModal permite a los usuarios agregar o editar servicios mediante un formulario dentro de un modal.
// Flujo General:

// Si initialData está definido, se inicializa el formulario con esos datos.
// Al enviar el formulario:
// Llama a la función onSubmit pasada como prop.
// Limpia el formulario y cierra el modal tras un envío exitoso.
// Esquema de Validación:

// Valida los datos del formulario con yup:
// El name es obligatorio.
// La description requiere al menos 10 caracteres.
// El price debe ser un número positivo.
// Hooks y Estados:

// useForm: Maneja los datos del formulario.
// useState: Maneja el estado de carga.
// Detalles Específicos
// Props:

// isOpen: Controla si el modal está abierto o cerrado.
// onClose: Cierra el modal.
// onSubmit: Función para manejar la lógica de guardado de datos.
// initialData: Valores iniciales en caso de edición.
// Validaciones:

// Implementadas mediante yup y react-hook-form.
// UI:

// Cambia dinámicamente el título y el botón según el modo (Add Service o Edit Service).