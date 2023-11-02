// aqui defino mis controladores (C del MVC) -> controlan lo que sucede cuando el usuario accede a las diferentes rutas de mi app. (es un intermediario entre la "vista" y el "modelo" -> recibe solicitudes http, interactua con el modelo para recuperar o modificar datos, y devuelve una respuesta en forma de vista renderizada)

import { Viaje } from "../models/Viajes.js";

import { Testimonio } from "../models/Testimonialopo.js";

const paginaInicio = async (req, res) => {
    try {
        // en el ejemplo tachado: ambas nos se arrancan al mismo tiempo. una espera que termine la otra, teniendo un mayor tiempo de espera y bloqueando el renderizado de la pag hasta que termine... o sea 10 seg + 10 seg = 20 seg...
        // // const viajes = Viaje.findAll({ limit: 3 }),
        // // const testimonios = Testimonio.findAll({ limit: 3 }),
        // esta es la forma correcta de proceder (con el promise.all), ambos arrancan al mismo tiempo, reducen el tiempo de ejecucion y mejoran el performance
        const promiseDB = [];
        // 1. Solicito los registros del modelo "Viaje"... esta operacion devuelve una promesa, (al igual que la otra), 2. las cuales se añaden al arreglo (promiseDB)
        promiseDB.push(Viaje.findAll({ limit: 3 }));
        promiseDB.push(Testimonio.findAll({ limit: 3 }));
        // promise.all maneja las promesas almacenadas en promiseDB -> Toma el arreglo de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas del arreglo se han resuelto
        const resultado = await Promise.all(promiseDB);
        // send envia (imprime) como texto
        // res.send("Inicio");
        res.render("inicio", {
            pagina: "Inicio",
            claseInicio: "home",
            viajes: resultado[0],
            testimonios: resultado[1],
        });
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (req, res) => {
    // res.send("Nosotros");
    // render espera el nombre de una vista
    res.render("nosotros", {
        pagina: "Nosotros",
    }); /* renderizamos (generamos el html... por usar pug, porque puede ser otro tipo de archivo usando otro motor de vistas) mi plantilla ("nosotros.pug") ubicada en la carpeta "views"... y lo enviamos como respuesta al cliente */
};

const paginaViajes = async (req, res) => {
    // - consultar db
    // .findAll recupera todos los registros de la tabla asociada al modelo "Viaje" y los devuelve (como promesa y) como un array de instancias del modelo en cuestion
    const viajes = await Viaje.findAll(); /* devuelve un promise  */

    res.render("viajes", {
        pagina: "Próximos Viajes",
        viajes,
        // viajes: viajes... también pudimos poner resultado: viajes
    });
};

// * lo ponemos de manera asincrona para decirle que espere hasta que se recuperen todos los datos... para ya despues renderizarlo
// * para mas info sobre :slug req.params y .findOne ve a 13 reqparams y findone.mkd
const paginaViaje = async (req, res) => {
    // console.log(req.params); /* si accedes a la url de .../viajes/viaje-italia, imprime -> { slug: viaje-italia} */
    // aplicas destructuring... slug será viaje-italia
    const { slug } = req.params;

    // ! cada que usas un "async" debes usar un "try catch"
    try {
        // con .findOne (de sequelize) seleccionas solo 1... que cumpla dicha condicion. si checas en la consola es como... select id, titulo, ... from viajes where viajes.slug = italia (basicamente sql)... el punto es que devuelve una promesa que se resuelve en un OBJETO (no en un array de objetos como con .findAll)
        const viaje = await Viaje.findOne({ where: { slug } });
        // console.log(viaje); /* viaje será un objeto con toda la información de (su fila -> italia) titulo, id, imagen, descripcion, slug, etc...*/
        res.render("viaje", {
            pagina: "Información Viaje",
            viaje /* pasamos el objeto */,
        });
    } catch (error) {
        console.log(error);
    }
    // console.log(viaje);
};

const paginaTestimoniales = async (req, res) => {
    // ! cada que usas un "async" debes usar un "try catch"
    // recuperando los testimoniales de la db
    try {
        const testimonios = await Testimonio.findAll();
        res.render("testimoniales", {
            pagina: "Testimoniales",
            testimonios,
        });
    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaViaje,
};
