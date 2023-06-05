const express= require ('express')
const rutas= express.Router();//a express le pido una ruta
const alumnosControles= require ('../controles/alumnosControles')

rutas.get('/',alumnosControles.todosAlumnos)// llamo a la funcion 
rutas.get('/:dni',alumnosControles.soloDni)
rutas.delete('/:dni',alumnosControles.borrarAlumnoDni)
rutas.post('/',alumnosControles.crearAlumno)
rutas.put('/:dni',alumnosControles.modificarAlumno)

module.exports = {rutas}

