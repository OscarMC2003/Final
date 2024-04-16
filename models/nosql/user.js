const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        edad: {
            type: Number
        },
        ciudad: {
            type: String
        },
        intereses: {
            type: [String]
        },
        ofertas: {
            type: Boolean
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("user", userSchema)