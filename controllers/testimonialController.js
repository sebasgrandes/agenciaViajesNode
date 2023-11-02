// * importando mi modelo de "Testimonio" para poder escribir en mi tabla "testimonialex"
import { Testimonio } from "../models/Testimonialopo.js";

const guardarTestimonial = async (req, res) => {
    // const testimonial = req.body; /* req.body es el (objeto) cuerpo de la soli post (los datos que enviaste en tu formulario */
    // en tu objeto req.body, las propiedades que están dentro son los "names" que colocaste en tu formulario, los cuales contienen sus respectivos valores
    const { nombre, email, mensaje } = req.body;

    // validando...
    const errores = [];
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El campo nombre está vacío" });
    }
    if (email.trim() === "") {
        errores.push({ mensaje: "El campo email está vacío" });
    }
    if (mensaje.trim() === "") {
        errores.push({ mensaje: "El campo mensaje está vacío" });
    }
    // * volviendo a renderizar despues de haber validado
    // recuerda que render toma 2 parametros, 1. la vista que deseas renderizar y 2. la información  que deseas enviar
    if (errores.length > 0) {
        // si hay algun error, muestrame la vista con errores
        // también recuperamos los testimonios
        const testimonios = await Testimonio.findAll();
        res.render("testimoniales", {
            pagina: "Testimoniales",
            errores,
            nombre,
            email,
            mensaje,
            testimonios,
        });
    } else {
        // si no hay errores... almacena (lo enviado en el form) en la base de datos
        // ! cada que usas un "async" debes usar un "try catch"
        try {
            await Testimonio.create({
                nombre,
                correo: email,
                mensaje,
            });
        } catch (error) {
            console.log(error);
        }
        res.redirect(
            "/testimoniales"
        ); /* lo redirigimos a la pagina de testimoniales */
    }
};

export { guardarTestimonial };
