import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar: React.FC = () => {

    return (
        //ver las rutas y dirija a la pagina que corresponda
        <nav>
            <Link to="/">
                Inicio
            </Link>
            <Link to="/usuarios">
                Usuarios
            </Link>
            <Link to="/departamentos">
                Departamentos
            </Link>
            <Link to="/empleados">
                Empleados
            </Link>
        </nav>
    )

}

export default Navbar;
