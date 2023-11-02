// ! configurando express
// * para más informacion sobre el codigo de configuracion de express de este archivo ve a configuraciondeExpress.mkd

// - Importación del modulo Express para usar sus funciones
import express from "express"; // * colocalo sin corchetes. no olvides colocar "type": "module" en tu package.json
// - Importamos el router
import router from "./routes/index.js";
// - Conectar la base de datos
import db from "./config/db.js";

db.authenticate()
    .then(() => console.log("DB importada correctamente"))
    .catch((error) => console.log(error));

// - Inicializacion de la aplicacion express.
const app = express();

// - Configuracion del puerto.
const port = process.env.PORT || 4000;

// Definicion de las rutas... (está en routes/index.js)

// - habilitar pug
// queremos usar el template de pug
app.set(
    "view engine",
    "pug"
); /* configuramos mi app (.set) para que mi motor de vistas (que renderiza plantillas) ("view engine" -> programa que toma datos y una "plantilla" para crear una pagina web completa que se pueda ver en el navegador) sea pug */ // * Esto significa que cuando intentes renderizar plantillas, Express buscará automáticamente archivos con la extensión `.pug` y los procesará utilizando el motor de plantillas Pug.

// obteniendo el año actual
app.use("/", (req, res, next) => {
    const year = new Date();
    res.locals.nombreSitio = "Agencia de Viajes";
    res.locals.actualYear = year.getFullYear();
    next(); /* puedes usar "return" para forzarlo */
});

// - definir la carpeta publica
// le decimos que queremos agregar la carpeta publica como los archivos estaticos de express... de esta forma en nuestros archivos, .pug, ya tendríamos acceso a los archivos de la carpeta public
// * la carpeta public será tratada como la raíz para los archivos estáticos. Por lo tanto, cuando colocas un / al comienzo de la ruta en tu HTML o Pug, el navegador buscará el recurso desde esa "raíz", es decir, desde la carpeta public.
app.use(express.static("public"));

// - La línea app.use(express.urlencoded({ extended: true })); permite a tu aplicación Express analizar el cuerpo de las solicitudes POST que tienen el tipo de contenido application/x-www-form-urlencoded. Esto es común en los formularios HTML. Los datos del formulario se convertirán en un objeto JavaScript y se almacenarán en req.body. La opción extended: true permite el anidamiento de objetos en los datos.

// analiza el cuerpo de la solicitud entrante (del tipo de contenido que se utiliza normalmente para enviar datos de formularios HTML -> application/x-www-form-urlencoded), lo analiza y lo convierte en un objeto de js al que podemos acceder a traves de req.body
app.use(
    express.urlencoded({ extended: true })
); /* extrended true -> analiza los datos usando la biblioteca qs (que sí permite anidar objetos y arreglos para una mejor representacion de la cadena de consulta) */

// - uso del router: para conectar los manejadores de ruta con la aplicacion de express
// el use soporta todos los verbos... post, get, put, patch y delete
// le decimos a la aplicación Express (app) que use el objeto "router" que has definido para manejar las rutas que empiezan con /. Esto conecta las rutas que has definido en tu archivo de routes con tu aplicación Express.
// Aquí, el método .use() está diciendo que para cualquier ruta que comience con / (que serían prácticamente todas las rutas en una aplicación web típica), Express debería usar el objeto router que has definido en otro archivo para manejar esa solicitud (request -> o sea la solicitud http entrante) y respuesta.
app.use("/", router);

// - Escucha del servidor.
// * para más informacion ve a ciclosolicitud-respuesta.mkd
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
