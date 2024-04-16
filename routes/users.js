const express = require("express")
const router = express.Router()
const checkRol = require("../middleware/rol")


const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/users")
const { validatorCreateItem, validatorGetItem } = require("../validators/users")
//const customHeader = require("../middleware/customHeader")
const authMiddleware = require("../middleware/session")


router.get("/", authMiddleware, getItems)
router.get("/:id", getItem)
//router.post("/", createItem)
router.post("/", /*authMiddleware, checkRol(["admin"]),*/ validatorCreateItem, createItem)
router.put("/:id", validatorGetItem, updateItem)
router.delete("/:id", validatorGetItem, deleteItem )

module.exports = router