const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateMerchant= [
    check("name").exists().notEmpty().isString(),
    check("CIF").exists().notEmpty().isString(),
    check("direccion").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isEmail(),
    check("phone").exists().notEmpty().isString(),
    check("webpage").isEmpty()
]

const validatorGetMerchant = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateMerchant, validatorGetMerchant }