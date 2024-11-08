"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    alert('Vas a cerrar sesión');
    // Aquí podrías añadir la lógica de cierre de sesión
  };

  const handleNavigation = (path: string) => {
    alert(`Redireccionando a ${path}`);
    router.push(path);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        {/* Aquí puedes añadir el logo */}
        <h2>Barber
            <hr />
            Salon
        </h2>
      </div>
      <nav className={styles.navLinks}>
        <button onClick={() => handleNavigation('/dashboard/services')}>Services</button>
        <button onClick={() => handleNavigation('/dashboard/appointment')}>Appointment</button>
        <button onClick={() => handleNavigation('/dashboard/employees')}>Employees</button>
        <button onClick={() => handleNavigation('/dashboard/customers')}>Customers</button>
      </nav>
      <button className={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
