const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isString(),
    check("edad").exists().notEmpty().isNumeric(),
    check("ciudad").exists().notEmpty().isString(),
    check("intereses").exists().notEmpty().isArray(),
    check("ofertas").exists().notEmpty().isBoolean(),
    check("role").exists().notEmpty().isIn(["user", "admin"])
]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem }