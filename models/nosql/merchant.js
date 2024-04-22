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
        role: {
            type: String,
            default: "merchant"
        },
        webpage: {
            ciudad: {
                type: String
            },
            actividad: {
                type: String
            },
            titulo: {
                type: String,
                unique: true 
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
                type: [String]
            },
            numeropuntuaciones: {
                type: Number,
                default: 0
            },
            resenas: {
                type: [String]
            },
            promedio: {
                type: Number,
                default: 0 
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("merchant", merchantSchema)