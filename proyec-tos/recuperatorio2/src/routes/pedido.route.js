const {Router} = require('express')
const controller = require('../controllers/pedido.controller')
const route = Router()

route.get("/", controller.getPedidos)
route.get("/:id",controller.getPedidosById)
//route.put("/:dni",controller.updateAlumno)
route.post("/",controller.createPedido)

module.exports = route