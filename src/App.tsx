import React, { useEffect } from 'react';
import GestionUsuarios from './componentes/GestionUsuario';
//llamar al router
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Departamentos from './componentes/Departamentos';
import { Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Empleados from './componentes/Empleados';
import { useState } from 'react';
import './App.css';

//cambiar esta funcion para el componente de tipo funcional para q funcione el enrutador
// funcione correctmente el rout 


interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  idDepartamento: number;
}


const App: React.FC= () => {

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  //leer los datos del localstarge al cargar la apliacacion
  useEffect(() => {
    const storedDepartamentos = localStorage.getItem('departamentos');
    const storedEmpleados = localStorage.getItem('empleados');

    if (storedDepartamentos){
      setDepartamentos(JSON.parse(storedDepartamentos));
    }

    if (storedEmpleados){
      setEmpleados(JSON.parse(storedEmpleados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('departamentos', JSON.stringify(departamentos));
  }, [departamentos]);

  useEffect(() => {
    localStorage.setItem('empleados', JSON.stringify(empleados));
  }, [empleados]);


//redirecciona al respectivo componenete
  return(
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/usuarios' element={<GestionUsuarios/>}/>
          <Route path='/departamentos' element={<Departamentos empleados={empleados} departamentos={departamentos} setDepartamentos={setDepartamentos}/>}/>
          <Route path='/empleados' element={<Empleados departamentos={departamentos} empleados={empleados} setEmpleados={setEmpleados}/>}/>

        </Routes>
      </div>
    </Router>
  )
}

export default App