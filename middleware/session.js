const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { userModel, merchantModel } = require("../models")



const authMiddleware = async (req, res, next) => {
    console.log("Middleware de autenticación")
    try{
         if (!req.headers.authorization) {
        handleHttpError(res, "NOT_TOKEN", 401)
        return
    }
    // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
    const token = req.headers.authorization.split(' ').pop()
    //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
    const dataToken = await verifyToken(token)

    if(!dataToken._id) {
        handleHttpError(res, "ERROR_ID_TOKEN", 401)
        return
    }

    if(dataToken.role == "merchant"){
        console.log("Es un comercio")
        const user = await merchantModel.findById(dataToken._id)
        req.user = user // Inyecto al merchant en la petición
    }else if(dataToken.role == "user"){
        console.log("Es un usuario")
        const user = await userModel.findById(dataToken._id)
        req.user = user // Inyecto al user en la petición
    }else if(dataToken.role == "admin"){
        console.log("Es un admin")
        const user = await userModel.findById(dataToken._id)
        req.user = user // Inyecto al admin en la petición
    }else{
        handleHttpError(res, "ERROR_ROLE", 401)
    }
    
    next()
    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddleware