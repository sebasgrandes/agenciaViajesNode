import Sequelize from "sequelize";
import db from "../config/db.js";

// - definiendo un nuevo "modelo", el cual representa la tabla de "testimonialex"
// normalmente el nombre del const y el 1er argumento de .define deberían ser iguales ("Testimonial"). pero aqui usaremos un caso distinto por aprendizaje...
export const Testimonio = db.define(
    "Testimonial",
    {
        // no colocamos id porque ya se sobreentiende de parte de sequelize
        nombre: {
            type: Sequelize.STRING,
        },
        correo: {
            type: Sequelize.STRING,
        },
        mensaje: {
            type: Sequelize.STRING,
        },
    },
    {
        // agrego este codigo como aprendizaje
        tableName:
            "testimonialex" /* especifico manualmente el nombre de mi tabla */,
        // porque originalmente, sequelize pluraliza "Testimonial" para referirse automaticamente a mi tabla, es decir, la busca "Testimoniales"
        timestamps: false /* no añadas marcas de tiempo pq mi tabla no las tiene */,
    }
);
