const jwt = require('jsonwebtoken');
const { handleHttpError } = require("../utils/handleError")

const IscorrectCIF = (req, res, next) => {
    try{
        /*const CIFBody = req.body.cif  //Extrae el cif del body
        console.log("Body: " + CIFBody)*/
        const cifUrl = req.params.CIF //Extrae el cif de la url
        console.log("Url: " + cifUrl)

        const authHeader = req.headers.authorization
        console.log("Header: " + authHeader)
        const token = authHeader && authHeader.split(' ')[1] // Extrae el token de la cabecera
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token
        const comerceCif = decodedToken.CIF // Extrae el cif del token
        console.log("Token: " + comerceCif)

        if(/*CIFBody !== comerceCif &&*/ cifUrl !== comerceCif){
            handleHttpError(res, "CIF_NOT_ALLOWED", 403)
            return
        }

        next()
    }catch(err){
        handleHttpError(res, "ERROR_CIF", 403)
    }
}

module.exports = IscorrectCIF