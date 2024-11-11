import { IResponseService, IPostService } from "@/app/core/application/dto/services/services-response.dto"; // Interfaces para el tipado de datos de los servicios
import { Edit, Scissors, Trash2 } from "lucide-react"; // Iconos para los botones de editar y eliminar

// Propiedades esperadas por el componente `CardS`
interface CardProps {
    data: IResponseService; // Datos del servicio que se muestran en la tarjeta
    onEdit: (data: IPostService, id: number) => void; // Función para manejar la edición del servicio
    onDelete: (id: number) => void; // Función para manejar la eliminación del servicio
}

// Componente funcional que representa una tarjeta para un servicio individual
const CardS: React.FC<CardProps> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="card-container"> {/* Contenedor principal de la tarjeta */}
            {/* Información del servicio */}
            <div className="">
                <h1 className=" ">
                    <Scissors className="" /> {data.name} {/* Nombre del servicio con ícono */}
                </h1>
                <p className="">{data.description}</p> {/* Descripción del servicio */}
                <p className="">${data.price.toFixed(2)}</p> {/* Precio del servicio con formato de dos decimales */}
            </div>

            {/* Botones de acción: Editar y Eliminar */}
            <div className="btns-container">
                <button 
                    className="btn-generic" 
                    onClick={() => onEdit(data, data.id)} // Llama a `onEdit` con los datos y el ID del servicio
                >
                    <Edit /> Edit
                </button>
                <button 
                    className="btn-generic" 
                    onClick={() => onDelete(data.id)} // Llama a `onDelete` con el ID del servicio
                >
                    <Trash2 className="" /> Delete
                </button>
            </div>
        </div>
    );
};

export default CardS; // Exporta el componente para ser usado en otros lugares

// Explicación General
// Propósito del Componente: El componente CardS representa una tarjeta individual que muestra la información de un servicio (nombre, descripción y precio) y proporciona botones para realizar acciones como editar o eliminar el servicio.

// Props del Componente:

// data: Contiene los datos del servicio que se muestran en la tarjeta.
// onEdit: Función que se ejecuta cuando el usuario hace clic en el botón "Edit". Recibe los datos y el ID del servicio.
// onDelete: Función que se ejecuta cuando el usuario hace clic en el botón "Delete". Recibe solo el ID del servicio.
// Estructura de la Tarjeta:

// Encabezado:
// Muestra el nombre del servicio con un ícono (Scissors).
// Descripción:
// Breve descripción del servicio.
// Precio:
// Precio del servicio formateado con dos decimales.
// Botones de Acción:
// Botón de Editar con el ícono Edit.
// Botón de Eliminar con el ícono Trash2.
// Detalles Específicos
// Clases CSS:

// card-container: Contenedor principal de la tarjeta.
// btn-generic: Clase genérica para los botones que incluye estilos reutilizables.
// btns-container: Contenedor para agrupar los botones de acción.
// Iconos:

// Scissors: Representa el servicio.
// Edit: Icono para editar.
// Trash2: Icono para eliminar.
// Acciones:

// onEdit: Ejecuta una función pasada como prop para manejar la edición. Usa los datos y el ID del servicio.
// onDelete: Ejecuta una función pasada como prop para manejar la eliminación. Usa solo el ID del servicio.
// Flujo de Uso
// Renderización:
// La tarjeta muestra los datos de un servicio individual.
// Edición:
// Al hacer clic en el botón "Edit", se llama a la función onEdit pasando los datos del servicio y su ID.
// Eliminación:
// Al hacer clic en el botón "Delete", se llama a la función onDelete pasando el ID del servicio.
