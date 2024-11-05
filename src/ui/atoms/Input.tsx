import React from 'react'

//crear las clases de css para poner este imput de manera global, que me sirva para todo 

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // extendiendo todas las propiedades de los inputs (onchange, type, etc)
    placeholder?: string;
    type?: string;
    name?: string;
    error?: string;
}

export const Input =({ placeholder, type, name, error,  ...props }: InputProps) => {
    // desesctructuramos las props porque trae todas las de html
    return (
        <div className='input-generic'>
            <input type={type} name={name} placeholder={placeholder} className={`${error ? "error" : "no-error"}`} {...props}/>
            {error && <p className='error-message'>{error}</p>}
        </div>
    )
}
