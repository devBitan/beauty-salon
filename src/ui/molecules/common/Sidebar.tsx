"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const router = useRouter(); // Hook de Next.js para manejar la navegación

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    alert('Vas a cerrar sesión');
    // Aquí podrías añadir la lógica de cierre de sesión, como limpiar tokens o llamar a una API
  };

  // Función para manejar la navegación a diferentes rutas
  const handleNavigation = (path: string) => {
    alert(`Redireccionando a ${path}`); // Muestra una alerta con la ruta antes de redirigir
    router.push(path); // Navega a la ruta especificada
  };

  return (
    <div className={styles.sidebar}> {/* Contenedor principal del sidebar */}
      {/* Sección del logo */}
      <div className={styles.logo}>
        <h2>
          Barber
          <hr />
          Salon
        </h2>
      </div>

      {/* Navegación */}
      <nav className={styles.navLinks}>
        {/* Botones para las rutas principales */}
        <button onClick={() => handleNavigation('/dashboard/services')}>Services</button>
        <button onClick={() => handleNavigation('/dashboard/customers')}>Customers</button>
        {/* Botones comentados, puedes habilitarlos según lo necesites */}
        {/* <button onClick={() => handleNavigation('/dashboard/appointment')}>Appointment</button>
        <button onClick={() => handleNavigation('/dashboard/employees')}>Employees</button> */}
      </nav>

      {/* Botón de cierre de sesión */}
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar; // Exporta el componente
