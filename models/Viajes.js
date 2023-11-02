import Sequelize from "sequelize";
// importo la instancia de Squelize que ya configuré y que me sirve para interactuar con mi db
import db from "../config/db.js";

// - definiendo un nuevo "modelo", el cual representa la tabla de "viajes
// Este modelo puede ser utilizado para realizar operaciones de base de datos relacionadas con la tabla `viajes`, como consultas, inserciones, actualizaciones, etc., utilizando métodos proporcionados por Sequelize.
// el metodo .define de Squelize se utiliza para definir un modelo
export const Viaje = db.define("viaje", {
    // recuerda que sequelize toma el 1er argumento de .define ("viaje") para realizar la pluralización ("viajes") y con ello referirse a la tabla de tu db ("viajes")
    // también puedes simplemente colocarle "viajes" y no realizará la pluraliacion porque ya sabrá que está pluralizado
    titulo: {
        type: Sequelize.STRING,
    },
    precio: {
        type: Sequelize.STRING,
    },
    fecha_ida: {
        type: Sequelize.DATE,
    },
    fecha_vuelta: {
        type: Sequelize.DATE,
    },
    imagen: {
        type: Sequelize.STRING,
    },
    descripcion: {
        type: Sequelize.STRING,
    },
    disponibles: {
        type: Sequelize.STRING,
    },
    slug: {
        type: Sequelize.STRING,
    },
});
