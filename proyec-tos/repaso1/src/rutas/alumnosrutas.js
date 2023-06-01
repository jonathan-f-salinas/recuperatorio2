const express= require ('express')
const rutas= express.Router();//a express le pido una ruta
const alumnosControles= require ('../controles/alumnosControles')

rutas.get('/',alumnosControles.todosAlumnos)// llamo a la funcion 
rutas.get('/:dni',alumnosControles.soloDni)

module.exports = {rutas}

