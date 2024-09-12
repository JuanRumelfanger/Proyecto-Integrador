const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/registerImage');

const videogamesAPIController = require('../../controllers/api/productsAPIController');


//Rutas
//Listado de productos
router.get('/', videogamesAPIController.list);

//Listado de generos
router.get('/genres/list', videogamesAPIController.listGenres);


//Listado de plataformas
router.get('/plataforms/list', videogamesAPIController.listPlataforms);

//Detalle de producto
router.get('/:id', videogamesAPIController.detail);

//Agregar un nuevo producto
router.post('/create', upload.single('images'), videogamesAPIController.create);

//Modificar un producto
router.put('/update/:id', videogamesAPIController.update);

//Eliminar un producto
router.delete('/delete/:id', videogamesAPIController.destroy)

module.exports = router;