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
const borrarAlumnoDni = (req,res)=>{
    const dni= req.params.dni
    const indice = alumnos.findIndex(a=>a.dni==dni)
    if (indice>=0){
        const alumno= alumnos[indice];// guardo el alumno con el mismo dni 
        const resultado= alumnos.splice(indice,1) //indico apartir del indice encontrado cuanto debo eliminar
        res.status(200).json (`el alumno ${alumno.nombre} con dni ${alumno.dni} fue borrado exitosamente`)
        

    } res.status(400).json("el alumno no fue encontrado")

}
const crearAlumno = (req,res)=>{
    const datosAlumnos= req.body
    const existe= alumnos.find(a=>a.dni==datosAlumnos.dni)
    if (!existe){
        if (!datosAlumnos.tieneCurso){
            datosAlumnos.tieneCurso=false
        }
        if (!datosAlumnos.nombre){
            res.status(400).json(`no se puede crear un archivo sin nombre`)
        }else{
            alumnos.push(datosAlumnos)
            res.status(200).json(`el alumno ${datosAlumnos.nombre} fue creado correctamente`)
        }

        
    } else
    res.status(400).json(`el numero de dni ${datosAlumnos.dni} ya existe`)
}
const modificarAlumno =(req,res)=>{ // modificar el nombre y el tiene curso si no esta definida
    const dni= req.params.dni
    const body= req.body
    const indice = alumnos.findIndex(a=>a.dni==dni)
    if (indice>=0){
        alumnos[indice].nombre= body.nombre

        if (body.tieneCurso !== undefined){
            alumnos[indice].tieneCurso=body.tieneCurso
            body.tieneCurso=false
        }else{
            res.status(201).json({"datos actualizados": alumnos[indice]})
        }
    }else {
        res.status(400).json(`no se pudo modificar ya que el dni : "${dni}" no fue encontrado`)
        
    }

}
module.exports= {todosAlumnos, soloDni, borrarAlumnoDni,crearAlumno,modificarAlumno}
