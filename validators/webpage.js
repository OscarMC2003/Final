const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateWebPage= [
    check("webpage.ciudad").exists().notEmpty().isString(),
    check("webpage.actividad").exists().notEmpty().isString(),
    check("webpage.titulo").exists().notEmpty().isString(),
    check("webpage.resumen").exists().notEmpty().isString(),
    check("webpage.textos").exists().notEmpty().isArray(),
    check("webpage.filename").exists().notEmpty().isArray(),
    check("webpage.numeropuntuaciones").exists().isEmpty().isNumeric(),
    check("webpage.scoring").exists().isEmpty().isArray(),
    check("webpage.resenas").exists().isEmpty().isArray(),
    check("webpage.promedio").exists().isEmpty().isNumeric()
]

const validatorCreateResenaWebPage= [
    //console.log("validador1"),
    check("scoring").isString(),
    check("resenas").isString()
]


const validatorGetWebPage = [
    //console.log("validador2"),  
    check("CIF").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateWebPage, validatorGetWebPage, validatorCreateResenaWebPage }