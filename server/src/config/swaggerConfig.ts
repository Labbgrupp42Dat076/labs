import swaggerJsdoc from 'swagger-jsdoc';
import pomodoroSchema from './swaggerModels/pomodoroObject';
import noteSchema from './swaggerModels/noteObject';
import userSchema from './swaggerModels/userObject';
import todoSchema from './swaggerModels/todoObject';
import fileSchema from './swaggerModels/fileObject';




const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Study app API",
            description: "It's a study app",
            version: "1.0.0",
            contact: {
                name: "Amazing Developer"
            }
        },
        servers: [{ url: "http://localhost:8080" }],
        components: {
            securitySchemes: {
                SessionAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "connect.sid",
                }
            },
            schemas: {
                ...userSchema,
                ...todoSchema,
                ...noteSchema,
                ...fileSchema,
                ...pomodoroSchema, 
            }        
        }
    },
    apis: ["./src/router/*.ts"]
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
