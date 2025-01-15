import React, { useState } from 'react';
import './Empleados.css';


interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    idDepartamento: number;
}

interface Departamento {
    id: number;
    nombre: string;
}

//propiedades del componente mandando un arreglo q tiene los departamentos
interface EmpleadosProps {
    departamentos: Departamento[];
    empleados: Empleado[];
    setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

//componente con sus propiedads asia los dieferentes elementos
const Empleados: React.FC<EmpleadosProps> = ({ departamentos, empleados, setEmpleados }) => {

    //crear formulario de los empleados
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [idDepartamento, setIdDepartamento] = useState<number>(0);
    const [empleadoId, setEmpleadoId] = useState<number | null>(null);

    const agregarEmpleado = () => {
        if (nombre.trim() && apellido.trim() && idDepartamento !== 0) {
            if (empleadoId !== null) {
                // Actualizar empleado existente
                const empleadosActualizados = empleados.map((empleado) =>
                    empleado.id === empleadoId ? { ...empleado, nombre, apellido, idDepartamento } : empleado
                );
                setEmpleados(empleadosActualizados);
                setEmpleadoId(null);
            } else {
                // Agregar nuevo empleado
                const nuevoEmpleado: Empleado = {
                    id: empleados.length + 1,
                    nombre,
                    apellido,
                    idDepartamento
                };
                setEmpleados([...empleados, nuevoEmpleado]);
            }
            // Limpiar campos
            setNombre('');
            setApellido('');
            setIdDepartamento(0);
        } else {
            alert('Todos los campos son obligatorios para agregar un empleado.');
        }
    };

    const eliminarEmpleado = (id: number) => {
        const confirmacion = window.confirm('¿Está seguro de que desea eliminar este empleado?');
        if (confirmacion) {
            const empleadosFiltrados = empleados.filter((empleado) => empleado.id !== id);
            setEmpleados(empleadosFiltrados);
        }
    };

    const actualizarEmpleado = (id: number) => {
        const empleadoActualizar = empleados.find((empleado) => empleado.id === id);
        if (empleadoActualizar) {
            setNombre(empleadoActualizar.nombre);
            setApellido(empleadoActualizar.apellido);
            setIdDepartamento(empleadoActualizar.idDepartamento);
            setEmpleadoId(id);
        }
    };

    const obtenerNombreDepartamento = (id: number) => {
        const departamento = departamentos.find(dept => dept.id === id);
        return departamento ? departamento.nombre : 'Desconocido';
    };

    return (
        <div>
            <h1>Empleados</h1>
            <input type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder='Nombre del empleado'
            />
            <input type='text'
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder='Apellido del empleado'
            />
            <select 
                value={idDepartamento}
                onChange={(e) => setIdDepartamento(parseInt(e.target.value))}
            >
                <option value={0}>Seleccione su departamento</option>
                {
                    departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.id}>
                            {departamento.nombre}
                        </option>
                    ))
                }

            </select>
            <button onClick={agregarEmpleado}>{empleadoId !== null ? 'Actualizar' : 'Agregar'}</button>

            <h2>Lista de Empleados</h2>
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.id}>
                        <strong>Nombre:</strong> {empleado.nombre} {empleado.apellido}<strong>Departamento:</strong> {obtenerNombreDepartamento(empleado.idDepartamento)}
                        <button onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
                        <button onClick={() => actualizarEmpleado(empleado.id)}>Actualizar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Empleados;
