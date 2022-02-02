import { ConnectionOptions } from "typeorm"
const connectionOptions: ConnectionOptions = {
    type: "postgres",
    "database": "nPR-data",
    "synchronize": true,
    "logging": true,
    // "type": "mysql",
    // "host": "localhost",
    // "port": 3306,
    // "username": "test",
    // "password": "test",

    "entities": [
        "entities/**/*.*"
    ],
    "host": process.env.DB_ENDPOINT,
    "port": 5000,
    "username":process.env.DB_USERNAME,
    "password":process.env.DB_PASSWORD
}

export default connectionOptions