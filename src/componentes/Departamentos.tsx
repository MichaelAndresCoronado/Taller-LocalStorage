import React, { useState } from 'react';
import './Departamentos.css';

interface Departamento {
    id: number;
    nombre: string;
}

interface PropsDepartamento {
    departamentos: Departamento[];
    setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
}

//agregar las propiedades
interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    idDepartamento: number;
}

interface PropsDepartamento {
    departamentos: Departamento[];
    setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
    empleados: Empleado[];
}
const Departamentos: React.FC<PropsDepartamento> = ({ departamentos, setDepartamentos, empleados }) => {
    const [nombre, setNombre] = useState<string>('');

    const agregarDepartamento = () => {
        if (nombre.trim()) {
            const nuevoDepartamento: Departamento = {
                id: departamentos.length + 1, // Usar la longitud actual para generar el ID
                nombre
            };
            setDepartamentos([...departamentos, nuevoDepartamento]);
            setNombre(''); 
        } else {
            alert('El nombre del departamento es requerido');
        }
    };

    const eliminarDepartamento = (id: number) => {
        const tieneEmpleados = empleados.find(empleado => empleado.idDepartamento === id);
        if (tieneEmpleados) {
            alert('No se puede eliminar el departamento porque tiene empleados asignados.');
            return;
        }

        const confirmacion = window.confirm('¿Está seguro de que desea eliminar este departamento?');
        if (confirmacion) {
            const nuevosDepartamentos = departamentos.filter(departamento => departamento.id !== id);
            setDepartamentos(nuevosDepartamentos);
        }
    };

    const actualizarDepartamento = (id: number) => {
        const nuevoNombre = prompt('Ingrese el nuevo nombre del departamento:');
        if (nuevoNombre && nuevoNombre.trim()) {
            const nuevosDepartamentos = departamentos.map(departamento =>
                departamento.id === id ? { ...departamento, nombre: nuevoNombre } : departamento
            );
            setDepartamentos(nuevosDepartamentos);
        } else {
            alert('El nombre del departamento es requerido');
        }
    };

    return (
        <div>
            <h1>Gestión de Departamentos</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nombre del Departamento"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button className="guardar" onClick={agregarDepartamento}>Registrar</button>
            </div>
            <h2>Lista de Departamentos</h2>
            <ul>
                {departamentos.map((departamento) => (
                    <li key={departamento.id}>
                        <strong>ID:</strong> {departamento.id}<strong>Nombre:</strong> {departamento.nombre}
                        <button onClick={() => actualizarDepartamento(departamento.id)}>Actualizar</button>
                        <button onClick={() => eliminarDepartamento(departamento.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exportar con el nombre actualizado
export default Departamentos;