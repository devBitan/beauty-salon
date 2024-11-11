import React from 'react'; // Importa React para definir el componente
import '../../app/globals.scss'; // Importa estilos globales

// Propiedades esperadas por el componente
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string; // Texto de marcador de posición (opcional)
    type?: string; // Tipo de entrada (opcional, por ejemplo, "text", "password", etc.)
    name?: string; // Nombre del campo (opcional)
    error?: string; // Mensaje de error (opcional)
}

// Componente funcional que representa un input reutilizable
export const Input = ({ placeholder, type, name, error, ...props }: InputProps) => {
    return (
        <div className="input-container"> {/* Contenedor principal del campo de entrada */}
            {/* Campo de entrada */}
            <input
                type={type} // Tipo de entrada
                name={name} // Nombre del campo
                placeholder={placeholder} // Texto de marcador de posición
                className={`${error ? "error" : "no-error"}`} // Aplica clase basada en la existencia de un error
                {...props} // Pasa cualquier otra propiedad al input
            />
            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

// Explicación General
// Propósito del Componente
// El componente Input es un campo de entrada reutilizable que:

// Se puede utilizar en diferentes formularios.
// Maneja validaciones básicas al mostrar un mensaje de error cuando sea necesario.
// Es totalmente personalizable mediante las propiedades adicionales de React.InputHTMLAttributes.
// Props del Componente
// placeholder (opcional): Texto que aparece dentro del campo cuando está vacío.
// type (opcional): Tipo de entrada (por ejemplo, text, password, email, etc.).
// name (opcional): Nombre del campo, utilizado en los formularios para identificar el valor.
// error (opcional): Mensaje de error asociado al campo. Si está presente, se muestra debajo del campo de entrada.
// Flujo de Lógica
// Si la propiedad error está presente, el campo se renderiza con una clase adicional error.
// Si no hay errores, se utiliza la clase no-error.
// Cualquier otra propiedad adicional (...props) se pasa directamente al campo de entrada, lo que permite una mayor flexibilidad.