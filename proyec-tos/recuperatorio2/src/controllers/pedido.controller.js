const pedidos = require('../../data/pedidos.json')
const viandas = require('../../data/viandas.json')
const alumnos = require('../../data/alumnos.json')
//const httpStatusCodes = require('http2').constants;

const getPedidos = (_, res) => {
    res.status(200).json(pedidos)
}
const getPedidosById = (req, res) => {
    const {id}  = req.params
    const pedido = pedidos.find((p) => p.id == id)
  
    if (pedido) {
      res.status(200).json(pedido.vianda)
      return 0;
    } else {
      res.status(404).json({ error: 'pedido no encontrado' })
    }
  }


  let pedidoId = 1; // Variable global para almacenar el último ID de pedido

const createPedido = (req, res) => {
  const { dni, tipo } = req.body;

  const alumno = alumnos.find((a) => a.dni == dni);
  console.log(alumno)
  if (!alumno || !alumno.habilitado) {
    res.status(400).json({ error: `El alumno con el DNI: ${dni} no existe o no está habilitado para realizar el pedido` });
    return;
  }

  const viandaID = viandas.findIndex(vianda => vianda.stock > 0 && vianda.tipo == tipo && vianda.aptoCeliaco == alumno.celiaco);
  console.log(viandaID)
  if (viandaID == -1) {
    res.status(400).json({ error: 'No hay una vianda disponible que cumpla las condiciones' });
    return;
  }

  viandas[viandaID].stock--; // actualizo el stock de la vianda

  alumno.habilitado = false; // deshabilito al alumno

  const idPedido = pedidoId;
  pedidoId++; // Incremento el ID para el próximo pedido

  const fechaPedido = new Date().toISOString().slice(0, 10); // obtengo la fecha en formato ISO 8601

  const newPedido = {
    id: idPedido,
    fecha: fechaPedido,
    alumno: { ...alumno, habilitado: undefined }, // atributo en undefined para ocultarlo en la creación
    vianda: { ...viandas[viandaID], stock: undefined }
  };

  // Resto del código para guardar el pedido, enviar respuesta, etc.
  pedidos.push(newPedido);
  res.status(201).json({ message: 'Pedido creado correctamente', pedido: newPedido });
};

module.exports = {
    getPedidos,
    getPedidosById,
    createPedido
}