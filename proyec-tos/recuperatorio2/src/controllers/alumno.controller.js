const alumnos = require('../../data/alumnos.json')
//const httpStatusCodes = require('http2').constants;

const getAlumnos = (_, res) => {
    res.status(200).json(alumnos)
}
const getAlumnoByDni = (req, res) => {
    const {dni}  = req.params
    const alumno = alumnos.find((a) => a.dni == dni)
  
    if (alumno) {
      res.status(200).json(alumno)
      return 0;
    } else {
      res.status(404).json({ error: 'alumno no encontrado' })
    }
  }
  const updateAlumno = (req, res) => {
    const { dni } = req.params
    const { habilitado, celiaco , edad } = req.body// solo me quedo con estos parametros del body
  
    const alumno = alumnos.find((a) => a.dni == dni)
  
    if (!alumno) {
      res.status(404).json({ error: 'alumno no encontrado' })
      return 0;
    }
  
    if (habilitado !== undefined) {
      alumno.habilitado = habilitado
    }
    if (celiaco !== undefined) {
      alumno.celiaco = celiaco
    }
    if (edad !== undefined) {
      alumno.edad = edad;
    }
  
    res.status(200).json({ message: 'alumno actualizado correctamente', alumno });
  }
/*
  const createAlumno = (req, res) => {
    const { dni, nombre,celiaco, edad } = req.body 
    
    const dniRegex = /^\d{8}$/
    if (!dniRegex.test(dni)) {// .test() verifica si una cadena cumple con un patrón definido por una expresión regular
        console.log(dni)
      res.status(400).json({ error: `se solicita el ingreso de 8 digitos para el dni ${dni}` })
      return 0;
    }
  
    const existeAlumno = alumnos.find((a) => a.dni == dni)
    if (existeAlumno) {
      res.status(400).json({ error: 'El alumno ya está registrado' })
      return 0;
    }
  
    const habilitado = true
    

    const Esceliaco = (celiaco !== undefined) ? celiaco : false;
  
    if (edad < 18 || edad > 99) {
      res.status(400).json({ error: 'la edad ingresada tiene que ser un numero mayor a 18 y menor a 99' })
      return
    }else edad=edad
  
  
    const newAlumno = {
      dni,
      nombre,
      habilitado,
      Esceliaco,
      edad
      
    }
  
    alumnos.push(newAlumno)
    res.status(201).json({ message: 'alumno creado correctamente', alumno: newAlumno })
  }*/
  
const createAlumno = (req, res) => {
  const { dni, nombre, celiaco, edad } = req.body;
  
  const dniRegex = /^\d{8}$/;
  if (!dniRegex.test(dni)) {
    res.status(400).json({ error: `Se solicita el ingreso de 8 dígitos para el DNI. Usted ingresó ${dni}` });
    return;
  }
  
  const existeAlumno = alumnos.find((a) => a.dni == dni);
  if (existeAlumno) {
    res.status(400).json({ error: `El alumno con dni: ${dni} ya está registrado` });
    return;
  }
  
  const habilitado = true;
  
  const esCeliaco = (celiaco !== undefined) ? celiaco : false;
  
  if (edad < 18 || edad > 99) {
    res.status(400).json({ error: `la edad ingresada : ${edad}, debe ser un numero mayor a 18 y menor a 99` });
    return;
  }
  
  const newAlumno = {
    dni,
    nombre,
    habilitado,
    celiaco: esCeliaco,
    edad
  };
  
  alumnos.push(newAlumno);
  res.status(201).json({ message: 'Alumno creado correctamente', alumno: newAlumno });
};
 
module.exports = {
    getAlumnos,
    getAlumnoByDni,
    updateAlumno,
    createAlumno
}