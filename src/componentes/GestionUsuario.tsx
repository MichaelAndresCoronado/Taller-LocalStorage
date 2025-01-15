import React, {useState} from 'react';
import './GestionUsuarios.css';


interface Usuario{
    id: number;
    nombre: string;
    email: string;
}

const GestionUsuarios: React.FC = () => {

    //declarar estados, declarar todas variables va siempre antes del retornar
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [usuarioId, setUsuarioId] = useState<number | null>(null);

    const agregarUsuario = () => {
        if (nombre.trim() && email.trim()) {
            if (usuarioId !== null) {
                //actualizar usuarios exsitentes
                const usuariosActualizados = usuarios.map((usuario) =>
                    usuario.id === usuarioId ? { ...usuario, nombre, email } : usuario
                );
                setUsuarios(usuariosActualizados);
                setUsuarioId(null);// Reiniciar el estado de usuarioId
            } else {
                // Agregar un nuevo usuario
                const nuevoUsuario: Usuario = {
                    id: Date.now(),
                    nombre,
                    email
                };
                setUsuarios([...usuarios, nuevoUsuario]);
            }
            // Limpiar los campos
            setNombre('');
            setEmail('');
        } else {
            alert('Nombre y email son requeridos');
        }
    };

    const eliminarUsuario = (id: number) => {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
    }

    const actualizarUsuario = (id: number) => {
        const usuarioActualizado = usuarios.find((usuario) => usuario.id === id);
        if (usuarioActualizado) {
            setNombre(usuarioActualizado.nombre);
            setEmail(usuarioActualizado.email);
            setUsuarioId(id);// Establecer el usuario que se está actualizando
        }
    };



    return(
        <div>
            <h1>Gestión de Usuarios</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder='Nombre'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />    
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> 
                {/* <button onClick={agregarUsuario}>{usuarioId !== null ? 'Actualizar' : 'Guardar'}</button> */}
                <button className="guardar" onClick={agregarUsuario}>{usuarioId !== null ? 'Actualizar' : 'Guardar'}</button>
            </div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {
                    usuarios.map((usuario) => (
                        <li key={usuario.id}>
                            {usuario.nombre} - {usuario.email}
                            {/* <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            <button onClick={() => actualizarUsuario(usuario.id)}>Actualizar</button> */}
                            
                            <button className="eliminar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            <button className="actualizar" onClick={() => actualizarUsuario(usuario.id)}>Actualizar</button>

                        </li>
                    ))
                }
            </ul>
        </div>

    )
}
//para llamarlo con este nombre en el principal
export default GestionUsuarios;
