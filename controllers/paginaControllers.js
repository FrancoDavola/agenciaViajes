import { Viaje } from '../models/Viaje.js'
import { Testimoniales } from '../models/Testimoniales.js'
import { Op } from 'sequelize'




const paginaInicio = async  (req, res) => {

    const promiseDB = []

    promiseDB.push(Viaje.findAll({ limit : 3}))
    promiseDB.push(Testimoniales.findAll({ limit : 3}))

    try {
        const resultado = await Promise.all(promiseDB)
        

        res.render('inicio', {
            pagina : 'Inicio',
            clase : 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
         
        })

    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req , res) => {
    res.render('nosotros',{
        pagina : 'Nosotros'
    })

}

const paginaViajes = async  (req , res) => {

const viajes = await Viaje.findAll()

console.log(viajes)


    res.render('Viajes',{
        pagina : 'Proximos viajes',
        viajes
    })

}

const paginaInformacionViajes = async (req ,res) => {

         const {slug} = req.params

   try {
         const viaje = await Viaje.findOne({where : {slug} })
       

         res.render('viaje',{
          viaje
         })

   } catch (error) {
       console.log(error)
   } 
}

const paginaTestimoniales = async (req , res) => {

    const testimoniales = await Testimoniales.findAll()
    console.log(testimoniales)

    res.render('testimoniales',{
        pagina : 'Testimoniales',
        testimoniales
        
    })

}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaInformacionViajes,
}