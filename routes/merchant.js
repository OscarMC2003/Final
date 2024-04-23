const express = require("express")
const router = express.Router()
const checkRol = require("../middleware/rol")


const { getItems, getItem, createItem, updateItem, deleteMerchant, busquedaProfunda, updateFoto } = require("../controllers/merchant")
const { validatorCreateMerchant, validatorGetMerchant } = require("../validators/merchant")
const { validatorCreateWebPage, validatorGetWebPage } = require("../validators/webpage")
//const customHeader = require("../middleware/customHeader")
const authMiddleware = require("../middleware/session")
const IscorrectCIF = require("../middleware/CIF")
const uploadMiddleware = require("../utils/handleStorage")


//Obtener merchant por cif
router.get("/:CIF", getItem)
//Obtener merchant por ciudad y actividad
router.get("/", busquedaProfunda) 
//crear user merchant
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateMerchant, createItem)
//Crear Webpage
router.put("/:CIF",authMiddleware, IscorrectCIF, validatorGetWebPage, validatorCreateWebPage, updateItem)
//Eliminar Webpage o merchant
router.delete("/:CIF", validatorGetWebPage, IscorrectCIF, deleteMerchant )
//Meter foto a comercio
router.put("/upload/:CIF", authMiddleware, IscorrectCIF, uploadMiddleware.single("file"), updateFoto)

module.exports = router