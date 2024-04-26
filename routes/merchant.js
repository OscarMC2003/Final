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

/**
 * @openapi
 * /api/merchant/:
 *  get:
 *      tags:
 *      - GetMerchant by CIF
 *      summary: Obtain a merchant by CIF
 *      description: return a merchant by CIF
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
//Obtener merchant por cif
router.get("/:CIF",authMiddleware, checkRol(["admin"]), getItem)

/**
 * @openapi
 * /api/merchant:
 *  get:
 *      tags:
 *      - GetMerchants by city, activity and score
 *      summary: Obtain a merchant by city, activity and score
 *      description: return a merchant by city, activity and score
 *      parameters:
 *       - in: query
 *         name: actividad
 *         description: The activity of the merchant
 *         type: String
 *       - in: query
 *         name: ciudad
 *         description: The city of the merchant
 *         type: String
 *       - in: query
 *         name: order
 *         description: The score order of the merchants
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Obtener merchant por ciudad y actividad
router.get("/", busquedaProfunda) 

/**
 * @openapi
 * /api/merchant:
 *  post:
 *      tags:
 *      - CreateMerchant
 *      summary: create a merchant
 *      description: return a merchant with the token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createMerchant"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//crear user merchant
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateMerchant, createItem)

/**
 * @openapi
 * /api/merchant/:
 *  put:
 *      tags:
 *      - CreateWebPage
 *      summary: create a Webpage
 *      description: return a webPage with the token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createWebPage"
 *      parameters:
 *       - in: path
 *         name: CIF
 *         description: The CIF of the merchant
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Crear Webpage
router.put("/:CIF",authMiddleware, IscorrectCIF, validatorGetWebPage, validatorCreateWebPage, updateItem)

/**
 * @openapi
 * /api/merchant/:
 *  delete:
 *      tags:
 *      - DeleteWebPageOrMerchant
 *      summary: delete a Webpage or merchant   
 *      description: return a webPage or merchant deleted
 *      parameters:
 *       - in: path
 *         name: CIF
 *         description: CIF of the merchant
 *         type: String
 *       - in: path
 *         name: delete
 *         description: what you want to delete
 *         type: String
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Eliminar Webpage o merchant
router.delete("/:CIF", validatorGetWebPage, IscorrectCIF, deleteMerchant )

//Meter foto a comercio
router.put("/upload/:CIF", authMiddleware, IscorrectCIF, uploadMiddleware.single("file"), updateFoto)

/**
 * @openapi
 * /api/merchant/:
 *  get:
 *      tags:
 *      - GetMerchants
 *      summary: show all merchants  
 *      description: return all merchants
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
//Obtener todos los comercios
router.get("/todosLosComercios/prueba", authMiddleware, checkRol(["admin"]), getItems)

module.exports = router