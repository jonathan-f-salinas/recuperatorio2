const {Router} = require('express')
const controller = require('../controllers/vianda.controller')
const route = Router()

route.get("/", controller.getViandas)
route.get("/:codigo", controller.getViandaByCodigo)
route.put("/:codigo",controller.updateVianda)
route.post("/",controller.createVianda)

module.exports = route