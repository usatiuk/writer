import { app } from "~app";
import { config } from "~config";
import { connect } from "~config/database";

connect()
    .then(async (connection) => {
        console.log(`connected to ${connection.name}`);
        app.listen(config.port);
        console.log(`listening at ${config.port}`);
    })
    .catch((error) => console.log(error));
