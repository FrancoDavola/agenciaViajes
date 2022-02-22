import express from "express"
import router from "./routes/index.js"
import db from './config/db.js'
import dotenv from 'dotenv'

dotenv.config({path: 'variables.env'})

const app = express()



db.authenticate()
     .then( () => console.log('Base de datos conectado'))
     .catch( error => console.log(error))




app.set('view engine' , 'pug')

app.use( (req, res , next) => {

   const year = new Date()

   res.locals.actualYear = year.getFullYear()
   res.locals.nombreEmpresa = 'Agencia De Viajes | '
   next()

})

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/' , router)

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000


app.listen(port, host ,  () => {
    console.log(`el servidor esta funcioando`)
})