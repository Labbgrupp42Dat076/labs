import { app } from "./start";
import { initDB } from "./db/conn";

/**
* App Variables
*/


const PORT : number = 8080;


/**
* Server Activation
*/


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
initDB();