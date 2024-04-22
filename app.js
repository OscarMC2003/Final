const express = require("express")
const cors = require("cors")
require("dotenv").config();
const morganBody = require("morgan-body")
const {IncomingWebhook} = require("@slack/webhook")
const loggerStream = require("./utils/handleLogger")



const app = express()
const dbConnect = require("./config/mongo")

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors()) 
app.use(express.json())

//Le digo que directorio es publico
//app.use(express.static("storage")) // http://localhost:3000/file.jpg


//app.use("/api", require("./routes/storage"))

app.use("/api", require("./routes")) //Lee routes/index.js por defecto

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

/*const loggerStream = {
    write: message => {
        webHook.send({
            text: message
        })
    },
}*/

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
    dbConnect();
})