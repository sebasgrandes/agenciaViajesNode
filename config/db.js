// importamos la clase Sequelize de la dependencia "sequelize"
import Sequelize from "sequelize";
// 1. importamos la dependencia dotenv y 2. ejecutamos automaticamente la funcion config() de dotenv -> lee el archivo .env, parsea el contenido y carga las variables de entorno encontradas en el objeto process.env de node.js
import dotenv from "dotenv/config";

console.log(
    process.env.DB_HOST
); /* accedemos a la variable de entorno del objeto process.env */

// se crea una nueva instancia del objeto Sequelize, que se utilizará para interactuar con la base de datos.
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: 3306,
        dialect: "mysql",
        define: {
            timestamps: false,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        operatorAliases: false,
    }
);

export default db;
