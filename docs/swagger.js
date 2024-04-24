const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "ComerceWeb",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "ricardo.palacios@u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            createUser: {
                type: "object",
                required: ["name", "email", "password", "edad", "ciudad", "intereses", "ofertas"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    edad: {
                        type: "integer",
                        example: 20
                    },
                    email: {
                        type: "string",
                        example: "miemail@google.com"
                    },
                    password: {
                        type: "string"
                    },
                    ciudad: {
                        type: "string",
                        example: "Madrid"
                    },
                    intereses: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["deportes", "moda"]

                    },
                    ofertas: {
                        type: "boolean",
                        example: true
                    }
                },
            },
            login: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "miemail@google.com"
                  },
                password: {
                    type: "string"
                  },
                }
            },
            updateUser: {
                type: "object",
                required: ["ciudad", "intereses", "ofertas"],
                properties: {
                    ciudad: {
                        type: "string",
                        example: "Madrid"
                    },
                    intereses: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["deportes", "moda"]

                    },
                    ofertas: {
                        type: "boolean",
                        example: true
                    }
                },
            },
            calificateWebPage: {
                type: "object",
                required: ["scoring", "resenas"],
                properties: {
                    scoring: {
                        type: "string",
                        example: "5"
                    },
                    resenas: {
                        type: "string",
                        example: "Muy bueno"
                    }
                },
            },
            createMerchant: {
                type: "object",
                required: ["name", "CIF", "direction", "email", "phone"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    CIF: {
                        type: "string",
                        example: "12345678A"
                    },
                    direction: {
                        type: "string",
                        example: "Calle Falsa 123"
                    },
                    email: {
                        type: "string",
                        example: ""
                    },
                    phone: {
                        type: "string",
                        example: "123456789"
                    },
                },
            },
            createWebPage: {
                type: "object",
                required: ["CIF", "webpage.ciudad", "webpage.actividad", "webpage.titulo", "webpage.resumen", "webpage.textos", "webpage.filename"],
                properties: {
                    CIF: {
                        type: "string",
                        example: "12345678A"
                    },
                    webpage: {
                        type: "object",
                        properties: {
                            ciudad: {
                                type: "string",
                                example: "Madrid"
                            },
                            actividad: {
                                type: "string",
                                example: "Deportes"
                            },
                            titulo: {
                                type: "string",
                                example: "Deportes Menganito"
                            },
                            resumen: {
                                type: "string",
                                example: "Resumen de la web"
                            },
                            textos: {
                                type: "array",
                                items: {
                                    type: "string"
                                },
                                example: ["Texto 1", "Texto 2"]
                            },
                            filename: {
                                type: "string",
                                example: "default.jpg"
                            },
                        },
                    },
                },
            },
            insertImage: {
                type: "object",
                required: ["filename"],
                properties: {
                    filename: {
                        type: "string",
                        example: "default.jpg"
                    }
                },
            },

        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)