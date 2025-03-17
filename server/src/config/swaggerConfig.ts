import swaggerJsdoc from 'swagger-jsdoc';
import pomodoroSchema from './swagger-models/pomodoroObject';
import noteSchema from './swagger-models/noteOnbject';



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
                    name: "connect.sid", // Default cookie name for express-session
                }
            },
            schemas: {
                ...pomodoroSchema, // Spread the schemas
                ...noteSchema       // Spread the schemas
            }        
        }
    },
    apis: ["./src/router/*.ts"]  // Specify the path to your router files
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
