const { handleHttpError } = require("../utils/handleError")
const jwt = require('jsonwebtoken');

const IscorrectEmail = (req, res, next) => {
    try{
        /*const CIFBody = req.body.cif  //Extrae el cif del body
        console.log("Body: " + CIFBody)*/
        const emailUrl = req.params.email //Extrae el cif de la url
        console.log("Url: " + emailUrl)

        const authHeader = req.headers.authorization
        console.log("Header: " + authHeader)
        const token = authHeader && authHeader.split(' ')[1] // Extrae el token de la cabecera
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token
        const useremail = decodedToken.email // Extrae el cif del token
        console.log("Token: " + useremail)

        if(/*CIFBody !== comerceCif &&*/ emailUrl !== useremail){
            handleHttpError(res, "NOT_EMAIL", 403)
            return
        }

        next()
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_EMAIL", 403)
    }
}

module.exports = IscorrectEmail