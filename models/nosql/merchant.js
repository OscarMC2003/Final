const mongoose = require("mongoose")

const merchantSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        CIF: {
            type: String,
            unique: true
        },
        direction: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        phone: {
            type: String
        },
        webpage: {
            ciudad: {
                type: String
            },
            actividad: {
                type: String
            },
            titulo: {
                type: String
            },
            resumen: {
                type: String
            },
            textos: {
                type: [String]
            },
            filename: {
                type: [String]
            },
            scoring: {
                type: [Number]
            },
            numeropuntuaciones: {
                type: Number
            },
            resenas: {
                type: [String]
            } 
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("merchant", merchantSchema)