import swaggerJsdoc from 'swagger-jsdoc';
import pomodoroSchema from './swagger-models/pomodoroObject';
import noteSchema from './swagger-models/noteObject';
import userSchema from './swagger-models/userObject';
import todoSchema from './swagger-models/todoObject';
import fileSchema from './swagger-models/fileObject';




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
