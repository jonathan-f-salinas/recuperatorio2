const viandas = require('../../data/viandas.json')
//const httpStatusCodes = require('http2').constants;

const getViandas = (_, res) => {
    res.status(200).json(viandas)
}
const getViandaByCodigo = (req, res) => {
    const { codigo } = req.params;
    const codigoLowerCase = codigo.toLowerCase(); //guardo y convierto el codigo ingresado a minuscula para luego compararlos
  
    const vianda = viandas.find((v) => v.codigo.toLowerCase() == codigoLowerCase);
  
    if (vianda) {
      res.status(200).json(vianda);
      return;
    } else {
      res.status(404).json({ error: 'Vianda no encontrada' });
    }
  }

  const updateVianda = (req, res) => {
    const { codigo } = req.params;
    const codigoLowerCase = codigo.toLowerCase(); 
    const vianda = viandas.find((v) => v.codigo.toLowerCase() == codigoLowerCase);
  
    const { aptoCeliaco, stock, descripcion } = req.body// solo me quedo con estos parametros del body
  
    if (!vianda) {
      res.status(404).json({ error: 'vianda no encontrado' })
      return 0;
    }

   /*utilizó el operador de fusion nula. Para asignar los valores
    solo si están definidos en req.body. De lo contrario, se mantiene el valor actual de la vianda.*/
    vianda.aptoCeliaco = aptoCeliaco ?? vianda.aptoCeliaco;
    vianda.stock = stock ?? vianda.stock;
    vianda.descripcion = descripcion ?? vianda.descripcion;
  
    res.status(200).json({ message: 'vianda actualizada correctamente', vianda });
  }

  const createVianda = (req, res) => {
    const { codigo, tipo, stock } = req.body;
  
    
    if (!codigo.startsWith('V') || codigo.length !== 5) {//utilizo .startwith() para determinar si lo ingresado comienza con lo señalado
      res.status(400).json({ error: 'El código de vianda debe comenzar con la letra V y tener 5 caracteres' });
      return 0;
    }
  
    const existeVianda = viandas.some((v) => v.codigo == codigo); //utilizo .some() para determinar si al menos un elemento cumple con una condición especificada
    if (existeVianda) {
      res.status(400).json({ error: 'La vianda ya se encuentra registrada' });
      return 0;
    }
  
    
    const tiposPermitidos = ['TARTA', 'POLLO', 'PASTA', 'PIZZA', 'EMPANADAS'];
    if (!tiposPermitidos.includes(tipo)) {
      res.status(400).json({ error: 'Tipo de vianda incorrecto' });
      return 0;
    }
  
    
    if (stock < 0) {
      res.status(400).json({ error: 'El stock debe ser mayor o igual a 0' });
      return 0;
    }
  
   
    const newVianda = {
      codigo,
      tipo,
      stock
    };
  
    viandas.push(newVianda);
    res.status(201).json({ message: 'Vianda creada correctamente', vianda: newVianda });
  }


module.exports = {
    getViandas,
    getViandaByCodigo,
    updateVianda,
    createVianda
}