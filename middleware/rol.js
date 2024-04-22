const { handleHttpError } = require("../utils/handleError")
const jwt = require('jsonwebtoken');
const checkRol = (roles) => (req, res, next) => { // Doble argumento
    console.log(roles)
    //console.log(req)
    /*try{
        const {user} = req
       const userRol = user.role
        console.log(userRol)
        const checkValueRol = roles.includes(userRol)
        console.log(checkValueRol)
        if (!checkValueRol) {
        handleHttpError(res, "NOT_ALLOWED", 403)
        return
    }
    next()
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }*/
    try{
        const authHeader = req.headers.authorization
        console.log("Header: " + authHeader)
        const token = authHeader && authHeader.split(' ')[1] // Extrae el token de la cabecera
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token
        const userRol = decodedToken.role // Extrae el cif del token
        console.log("Token: " + userRol)
        if (!roles.includes(userRol)) {
        handleHttpError(res, "NOT_ALLOWED", 403)
        return
    }
    next()
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol