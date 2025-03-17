import swaggerJsdoc from 'swagger-jsdoc';
import pomodoroSchema from './swagger-models/pomodoroObject';
import noteSchema from './swagger-models/noteOnbject';



const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Study app API",
            description: "It's a study app",
            version: "1.0.0",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:8080"]
        },
        components: {
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
