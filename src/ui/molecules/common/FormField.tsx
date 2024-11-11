"use client"; // Indica que el archivo se ejecuta en el cliente

import { Input } from "@/ui/atoms"; // Componente de entrada reutilizable
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form"; // Tipos y componentes de `react-hook-form`

// Definición de propiedades para el componente
interface IPropsFormField<T extends FieldValues> {
    label: string; // Etiqueta del campo (p. ej., "Nombre")
    type: string; // Tipo de input (p. ej., "text", "password", "email", etc.)
    name: Path<T>; // Nombre del campo, mapeado a las propiedades definidas en `react-hook-form`
    control: Control<T>; // Controlador del formulario (proporcionado por `useForm` de `react-hook-form`)
    error?: FieldError; // Error asociado al campo (opcional)
    id?: string; // ID opcional para el campo
    placeholder?: string; // Texto de marcador de posición opcional
}

// Componente funcional genérico
export const FormField = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    error,
    id,
    placeholder,
}: IPropsFormField<T>) => {
    return (
        <div className="field-container"> {/* Contenedor del campo */}
            <label htmlFor={id || label.toLowerCase()} className="">
                {label} {/* Muestra la etiqueta del campo */}
            </label>
            <Controller
                name={name} // Nombre del campo para `react-hook-form`
                control={control} // Controlador proporcionado por `useForm`
                render={({ field }) => (
                    <Input
                        id={id || label.toLowerCase()} // ID del campo (personalizado o derivado de la etiqueta)
                        type={type} // Tipo de input
                        error={error?.message} // Muestra el mensaje de error si existe
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`} // Marcador de posición opcional
                        {...field} // Props del campo gestionadas por `react-hook-form`
                    />
                )}
            />
        </div>
    );
};


// Explicación del Componente
// Propósito:

// Este componente proporciona un campo de formulario reutilizable que integra:
// react-hook-form: Para control de formularios.
// Input: Un componente de entrada personalizado que puede manejar errores y otros estilos.
// Flujo de Datos:

// La etiqueta, el marcador de posición y el error se pasan como props.
// El componente Controller de react-hook-form conecta el campo Input con el estado del formulario.
// El control maneja los datos y validaciones del formulario.
// Personalización:

// El placeholder y el id son opcionales, pero si no se proporcionan, se derivan de la etiqueta (label).
// Clases CSS:

// Puedes personalizar field-container y otras clases según el diseño de tu proyecto.
// Ventajas del Componente
// Reutilizable: Sirve para cualquier campo de formulario con validaciones.
// Genérico: Usando TypeScript con FieldValues, se adapta a cualquier estructura de datos del formulario.
// Integración: Funciona perfectamente con react-hook-form.