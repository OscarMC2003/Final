const jwt = require("jsonwebtoken")

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            //expiresIn: "2h"
        }
    )
    return sign
}

const tokenSignMerch = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            CIF: user.CIF,
        },
        process.env.JWT_SECRET,
        {
            //expiresIn: "2h"
        }
    )
    return sign
}

/**
 * Token se sesión
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken, tokenSignMerch }