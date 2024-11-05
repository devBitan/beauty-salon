// formulario generico para casi todos los poryectos 
"use client";

import { Input } from "@/ui/atoms";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

interface IPropsFormField<T extends FieldValues> {
    label: string;
    type: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
}

export const FormField = <T extends FieldValues>({ label, type, name, control, error, id, placeholder }: IPropsFormField<T>) => {
    return (
        <div>
            <label htmlFor={id || label.toLowerCase()} className={``}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input 
                        id={id || label.toLowerCase()}
                        type={type}
                        error={error?.message}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                        />
                )}
            />
        </div>
    )

}

//buscar cual es la diferencia entre export const ---- y const ---- y luego export default 


