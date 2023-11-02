// solo podemos (y debemos) tener una unica instancia a nuestra aplicación de express... y esta ya existe, se llama "app" (esta en la hoja index.js de la carpeta global)...
// ... pero lo que si podemos hacer es importar el express y usar el router

// importamos el modulo express para usar sus funciones
import express from "express";
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaViaje,
} from "../controllers/paginasController.js";

import { guardarTestimonial } from "../controllers/testimonialController.js";

// - creo una nueva instancia router (objeto que permite definir multiples rutas y sus manejadores en un solo lugar) que configuraré para manejar rutas específicas
// * para mas informacion ve a sobreRouterymas.mkd
const router = express.Router();

// - Definicion de las rutas.
// controller: paginasController
router.get("/", paginaInicio);
router.get("/nosotros", paginaNosotros);
router.get("/viajes", paginaViajes);
router.get("/viajes/:slug", paginaViaje);
router.get("/testimoniales", paginaTestimoniales);

// controller: testimonialController
router.post("/testimoniales", guardarTestimonial);

// exportamos el router para que pueda ser usado en otros archivos
export default router;
