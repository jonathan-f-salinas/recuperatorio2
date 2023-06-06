const {Router} = require('express')
const controller = require('../controllers/alumno.controller')
const route = Router()

route.get("/", controller.getAlumnos)
route.get("/:dni",controller.getAlumnoByDni)
route.put("/:dni",controller.updateAlumno)
route.post("/",controller.createAlumno)

module.exports = route