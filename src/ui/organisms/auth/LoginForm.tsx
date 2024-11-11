"use client"; // Indica que este componente se ejecuta del lado del cliente

import {
  ErrorResponse,
  FieldError,
  ILoginRequest,
} from "@/app/core/application/dto"; // Tipos de datos para manejar errores y solicitudes de inicio de sesión
import { FormField } from "@/ui/molecules"; // Campo de formulario reutilizable
import { yupResolver } from "@hookform/resolvers/yup"; // Validador para integrar Yup con react-hook-form
import { signIn } from "next-auth/react"; // Función para manejar la autenticación con NextAuth
import { useRouter } from "next/navigation"; // Manejo de navegación programática en Next.js
import { useForm } from "react-hook-form"; // Biblioteca para manejar formularios de manera declarativa
import * as yup from "yup"; // Biblioteca de validaciones de esquemas

// Esquema de validación para el formulario de inicio de sesión
const loginSchema = yup.object().shape({
  userName: yup
    .string()
    .email("El correo es inválido") // Valida que sea un correo válido
    .required("El correo el obligatorio"), // Campo obligatorio
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres") // Longitud mínima
    .required("La contraseña es obligatoria"), // Campo obligatorio
});

// Componente funcional para el formulario de inicio de sesión
export const LoginForm = () => {
  const {
    control, // Controlador de react-hook-form para manejar los inputs
    handleSubmit, // Función para manejar el envío del formulario
    setError, // Función para establecer errores manualmente
    formState: { errors }, // Objeto que contiene los errores de validación del formulario
  } = useForm<ILoginRequest>({
    mode: "onChange", // Valida conforme el usuario interactúa
    reValidateMode: "onChange", // Vuelve a validar los datos cuando cambian
    resolver: yupResolver(loginSchema), // Usa Yup para validar los datos
  });

  const router = useRouter(); // Hook para manejar navegación en Next.js

  // Función para manejar el inicio de sesión
  const handleLogin = async (data: ILoginRequest) => {
    console.log(data); // Imprime los datos ingresados
    try {
      // Llama al método de inicio de sesión de NextAuth
      const result = await signIn("credentials", {
        redirect: false, // No redirige automáticamente
        username: data.userName, // Pasa el correo como username
        password: data.password, // Contraseña ingresada
      });

      console.log(result); // Resultado del inicio de sesión

      if (result?.error) {
        console.log("Ocurrio un error", JSON.parse(result.error));
        handleError(JSON.parse(result.error)); // Maneja los errores del backend
        return;
      }

      // Redirige al usuario a la página de servicios tras un inicio de sesión exitoso
      router.push("/dashboard/services");
      router.refresh();
    } catch (error) {
      console.log(error); // Maneja errores inesperados
    }
  };

  // Función para manejar errores devueltos por el backend
  const handleError = (error: unknown) => {
    const erroData = error as ErrorResponse; // Convierte el error al tipo esperado
    if (erroData && erroData.errors) {
      if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
        erroData.errors.forEach((fieldError) => {
          const { field, error } = fieldError as FieldError;
          // Establece los errores específicos en los campos correspondientes
          setError(field as keyof ILoginRequest, {
            message: error,
          });
        });
      } else {
        // Maneja errores generales
        if ("message" in erroData.errors[0]) {
          setError("userName", {
            message: erroData.errors[0].message,
          });
        }
      }
    }
  };

  // Renderiza el formulario de inicio de sesión
  return (
    <form
      className="" // Clases de diseño
      onSubmit={handleSubmit(handleLogin)} // Maneja el envío del formulario
    >
      <h2 className="">Iniciar Sesión</h2>

      {/* Campo para el correo electrónico */}
      <FormField<ILoginRequest>
        control={control} // Controlador para el campo
        type="email" // Tipo de input
        label="Correo Electrónico" // Etiqueta del campo
        name="userName" // Nombre del campo
        error={errors.userName} // Mensaje de error
        placeholder="Ingresa tu correo" // Placeholder del campo
      />

      {/* Campo para la contraseña */}
      <FormField<ILoginRequest>
        control={control} // Controlador para el campo
        type="password" // Tipo de input
        label="Contraseña" // Etiqueta del campo
        name="password" // Nombre del campo
        error={errors.password} // Mensaje de error
        placeholder="Ingresa tu contraseña" // Placeholder del campo
      />

      {/* Botón de envío */}
      <button
        type="submit"
        className="" // Clases de estilo
      >
        Iniciar Sesión
      </button>
    </form>
  );
};


// Explicación General
// Propósito del Componente:

// Este formulario permite a los usuarios autenticarse mediante next-auth con el proveedor de credenciales.
// Flujo de Trabajo:

// Los datos ingresados son validados localmente usando react-hook-form y yup.
// Si la validación local es exitosa, se realiza una solicitud al backend usando signIn.
// Si ocurre un error, los errores específicos o generales se muestran en el formulario.
// Si el inicio de sesión es exitoso, el usuario es redirigido al panel de servicios.
// Validaciones:

// userName debe ser un correo válido y obligatorio.
// password debe tener al menos 8 caracteres y es obligatorio.
// Funciones Clave:

// handleLogin: Maneja la lógica de inicio de sesión.
// handleError: Traduce y muestra los errores devueltos por el backend en los campos correspondientes.