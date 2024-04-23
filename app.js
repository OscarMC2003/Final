const express = require("express")
const cors = require("cors")
require('dotenv').config();
const morganBody = require("morgan-body")
//const {IncomingWebhook} = require("@slack/webhook")
const loggerStream = require("./utils/handleLogger")

//const { sequelize, dbConnectMySql } = require("./config/mysql")

const app = express()
const dbConnect = require('./config/mongo')


const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())
//app.use("/api", require("./routes")) //Lee routes/index.js por defecto
app.use(express.static("storage")) // http://localhost:3000/file.jpg

app.use("/api-docs",
 swaggerUi.serve,
 swaggerUi.setup(swaggerSpecs)
)
app.use("/api", require("./routes"))

morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
    return res.statusCode < 400
 },
 stream: loggerStream
})


const port = process.env.PORT || 3000


   

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()
   
module.exports = app