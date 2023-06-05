const express= require('express');
const app= express()
const PORT = process.env.PORT || 3000;
const alumnosrutas= require ('./rutas/alumnosrutas')




app.use(express.json())

app.use('/alumnos',alumnosrutas.rutas)




app.listen(PORT, ()=>{console.log(`App escuhando en el puerto ${PORT}`)} )
