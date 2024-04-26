/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/

const { merchantModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { tokenSignMerch } = require("../utils/handleJwt")



const getItems = async (req, res) => {
    try{
        console.log("entra en getItems")
        const data = await merchantModel.find({})
        res.send(data)
    }catch (err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS_USERS', 403)
    }
        
}

const getItem = async (req, res) => {
    try{
        const data = await merchantModel.findOne({ CIF: req.params.CIF });
        res.send(data)
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEM_MERCHANTS', 403)
    }
        
}

const busquedaProfunda = async (req, res) => {
    try{
        const ciudad = req.query.ciudad
        const actividad = req.query.actividad
        const order = req.query.order
        console.log("Ciudad " + ciudad)
        console.log("Actividad " + actividad)
        console.log("Order " + order)
        if(order=="asc"){
            if(ciudad === ""){
                console.log("entra1")
                const data = await merchantModel.find({ "webpage.actividad": actividad }).sort({ "webpage.promedio": 1 });
                res.send(data);
            }else if(actividad === ""){
                console.log("entra2")
                const data = await merchantModel.find({"webpage.ciudad": ciudad }).sort({ "webpage.promedio": 1 });;
                res.send(data);
            }else if(ciudad === "" && actividad === ""){
                console.log("entra3")
                const data = await merchantModel.find({}).sort({ "webpage.promedio": 1 });
                res.send(data)
            }else{
                console.log("entra4")
                const data = await merchantModel.find({ "webpage.ciudad": ciudad, "webpage.actividad": actividad }).sort({ "webpage.promedio": 1 });;
                res.send(data);
            }
        }else{
            if(ciudad === ""){
                console.log("entra1")
                const data = await merchantModel.find({ "webpage.actividad": actividad });
                res.send(data);
            }else if(actividad === ""){
                console.log("entra2")
                const data = await merchantModel.find({"webpage.ciudad": ciudad });
                res.send(data);
            }else if(ciudad === "" && actividad === ""){
                console.log("entra3")
                const data = await merchantModel.find({})
                res.send(data)
            }else{
                console.log("entra4")
                const data = await merchantModel.find({ "webpage.ciudad": ciudad, "webpage.actividad": actividad });
                res.send(data);
            }
        }

    }catch (err){
        console.log(err)
        handleHttpError(res, 'ERROR_GET_BUSQUEDAPROFUNDA', 403)
    }
        
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        console.log(req)

        const dataMerch = await merchantModel.create(body)
        
        const data = {
            token: await tokenSignMerch(dataMerch),
            user: dataMerch
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS_MERCHANTS')
    }
}



const updateItem = async (req, res) => {
    try {
        const {CIF, ...body} = matchedData(req)
        console.log("Numero scoring: " + body.numeropuntuaciones)
        console.log(CIF)
        const data = await merchantModel.findOneAndUpdate({CIF:CIF}, body)
        console.log(data)
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS_MERCHANTS')
    }
}

const addReview = async (req, res) => {
    try {
        const { scoring, resenas } = matchedData(req);
        console.log(scoring)
        console.log(resenas)
        const {CIF} = req.params;
        console.log(CIF)
        const merchant = await merchantModel.findOne({ CIF: CIF });
        console.log(merchant)
        if (!merchant) {
            return res.status(404).json({ error: 'Merchant not found' });
        }
        console.log(merchant.webpage.numeropuntuaciones)
        console.log(merchant.webpage.scoring)
        console.log(merchant.webpage.resenas)
        console.log(merchant.webpage.promedio)

        merchant.webpage.numeropuntuaciones += 1;
        //merchant.webpage.scoring = (merchant.webpage.scoring + scoring) / merchant.webpage.puntuaciones;
        merchant.webpage.scoring.push(scoring);
        merchant.webpage.resenas.push(resenas);

        merchant.webpage.promedio = merchant.webpage.scoring.reduce((acc, score) => acc + parseInt(score), 0) / merchant.webpage.scoring.length;

        const data = await merchant.save();
        res.send(data);
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_ADD_REVIEW');
    }
}


const deleteMerchant = async (req, res) => {
    try {
        const type = req.query.delete
        console.log(type)
        if(type === "webpage"){
            const merchant = await merchantModel.findOneAndUpdate(
                { CIF: req.params.CIF },
                { $set: { webpage: "" } },
                { new: true }
            );
            console.log(merchant)
        
            if (!merchant) {
                return res.status(404).json({ error: 'Merchant not found' });
            }
        res.json(merchant);
        }else if(type === "merchant"){
            data = await merchantModel.deleteOne({CIF:req.params.CIF}); //borrado fisico
            res.send(data)
        }else{
            handleHttpError(res, 'ERROR_DELETE_ITEMS_MERCHANTS')
        }
  
      
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };

  const updateFoto = async (req, res) => {
    try {
        console.log(req)
        const CIF = req.params.CIF
        const file = req.file
        console.log(file)
        const data = await merchantModel.findOneAndUpdate({CIF:CIF}, {$set:{"webpage.filename":file.filename}})
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS_STORAGE')
    }
}



module.exports = { getItems, getItem, createItem, updateItem, deleteMerchant, addReview, busquedaProfunda, updateFoto }