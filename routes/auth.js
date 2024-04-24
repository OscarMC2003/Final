const express = require("express")
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const {validatorRegister, validatorLogin} = require("../validators/auth")
const router = express.Router()


/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - CreateUser
 *      summary: User register
 *      description: Register a new user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createUser"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/register", validatorRegister, registerCtrl)
/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - RegisterUser
 *      summary: User login
 *      description: Login with the user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error // No exist user // Unauthorized
 */
router.post("/login", validatorLogin, loginCtrl) 


module.exports = router