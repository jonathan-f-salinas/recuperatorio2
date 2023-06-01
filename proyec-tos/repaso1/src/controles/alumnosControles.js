const alumnos= require ('../../datos/alumnos.json')

const todosAlumnos = (req, res)=>{
    res.status(200).json(alumnos)
}
const soloDni = (req,res)=>{
    const dni = req.params.dni
    const indice= alumnos.findIndex(a=>a.dni==dni)
    
    if (indice>=0){
        res.status(200).json(alumnos[indice])
    }else {
        res.status(404).json("el alumno no fue encontrado")
    }
}

module.exports= {todosAlumnos, soloDni}
