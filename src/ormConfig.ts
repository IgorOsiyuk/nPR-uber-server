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
        "entity/**/*.*"
    ],
    "host": process.env.DB_ENDPOINT || "localhost",
    "port": 5000,
    "username":process.env.DB_USERNAME || "ihar",
    "password":process.env.DB_PASSWORD || "123"
}

export default connectionOptions