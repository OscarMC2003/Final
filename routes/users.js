const express = require("express")
const router = express.Router()
const checkRol = require("../middleware/rol")


const { getItems, getItem, createItem, updateUser, deleteUser, getInteresados } = require("../controllers/users")
const { validatorCreateItem, validatorGetItem, validatorGetUSer, validatorUpdateUser } = require("../validators/users")
const { updateItem, addReview } = require("../controllers/merchant")
//const customHeader = require("../middleware/customHeader")
const authMiddleware = require("../middleware/session")
const IscorrectEmail = require("../middleware/EMAIL")
const { validatorCreateResenaWebPage, validatorGetWebPage } = require("../validators/webpage")

//Editar user
router.put("/:email", authMiddleware, IscorrectEmail, validatorUpdateUser, updateUser)
//Borrar user
router.delete("/:email", authMiddleware, IscorrectEmail,validatorGetUSer, deleteUser)
//Escribir resena
router.put("/resena/:CIF", authMiddleware, checkRol(["user"]), validatorCreateResenaWebPage, validatorGetWebPage, addReview)
//Obtener usuarios interesados
router.get("/", authMiddleware, checkRol(["merchant"]), getInteresados)

module.exports = router