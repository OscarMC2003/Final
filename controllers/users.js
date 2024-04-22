/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { userModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const getItems = async (req, res) => {
    try{
        const data = await usersModel.find({})
        res.send(data)
    }catch (err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS_USERS', 403)
    }
        
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await usersModel.findById(id)
        res.send(data)
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEM_USERS', 403)
    }
        
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        console.log(body)
        const data = await userModel.create(body)
        console.log(data)
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS_USERS')
    }
}

const updateUser = async (req, res) => {
    console.log("Update")
    try {
        const {email, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        console.log(body)
        console.log(email)
        console.log(req.params.email)
        //const data = await usersModel.findOneAndUpdate({email:req.params.email}, body, { new: true })
        const data = await userModel.findOneAndUpdate({email:req.params.email}, body)
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_ITEMS_USERS')
    }
}

const deleteUser = async (req, res) => {
    try {
        //const {id} = matchedData(req)
        const data = await userModel.deleteOne({email:req.params.email}); //borrado fisico
        res.send(data)    
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_ITEM_USERS')
    }
}

const getInteresados = async (req, res) => {
    try {
        console.log("getInetresados")
        const direccion = req.query.direccion
        const intereses = req.query.intereses
        console.log(direccion)
        console.log(intereses)
        const data = await userModel.find({ ciudad: direccion, intereses:  { $in: intereses }, ofertas: true });
        console.log(data)       
        res.send(data);
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_INTERESADOS_MERCHANTS')
    }
}



module.exports = { getItems, getItem, createItem, updateUser, deleteUser, getInteresados };