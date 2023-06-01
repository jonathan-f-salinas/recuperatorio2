const alumnos= require ('../../datos/alumnos.json')

const todosAlumnos = (req, res)=>{
    res.status(200).json(alumnos)
}

module.exports= {todosAlumnos}
