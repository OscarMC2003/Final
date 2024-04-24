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

/**
 * @openapi
 * /api/users/:
 *  post:
 *      tags:
 *      - EditUser
 *      summary: User editer
 *      description: edit a existing user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateUser"	
 *      parameters:
 *       - in: path
 *         name: email
 *         description: email of the user
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Editar user
router.put("/:email", authMiddleware, IscorrectEmail, validatorUpdateUser, updateUser)

/**
 * @openapi
 * /api/users/:
 *  delete:
 *      tags:
 *      - DeleteUser
 *      summary: User delete
 *      description: edit a existing user
 *      parameters:
 *       - in: path
 *         name: email
 *         description: email of the user
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Borrar user
router.delete("/:email", authMiddleware, IscorrectEmail,validatorGetUSer, deleteUser)

/**
 * @openapi
 * /api/users/resena/:
 *  put:
 *      tags:
 *      - EditResena
 *      summary: Write a resena
 *      description: add resena to a webpage
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/calificateWebPage"	
 *      parameters:
 *       - in: path
 *         name: CIF
 *         description: CIF of the merchant
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Escribir resena
router.put("/resena/:CIF", authMiddleware, checkRol(["user"]), validatorCreateResenaWebPage, validatorGetWebPage, addReview)

/**
 * @openapi
 * /api/users/:
 *  get:
 *      tags:
 *      - ObtainInterested   
 *      summary: Obtain interested users
 *      description: Obtain interested users
 *      parameters:
 *       - in: path
 *         name: direccion
 *         description: direccion of the user
 *         type: String
 *       - in: path
 *         name: actividad
 *         description: actividad of the user
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Obtener usuarios interesados
router.get("/", authMiddleware, checkRol(["merchant"]), getInteresados)

module.exports = router