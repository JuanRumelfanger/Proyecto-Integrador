const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');
const upload = require('../middlewares/productImage.js');
const usersController = require('../controllers/usersController.js');

router.get('/', productsController.listProducts);
router.get('/search', productsController.search)

// CREAR UN PRODUCTO
router.get('/create', productsController.create);
router.post('/create', upload.single('images'), productsController.store);

//DETALLE DE UN PRODUCTO
router.get('/:id', productsController.productsDetail);

// EDITAR UN PRODUCTO
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', upload.single('images'), productsController.update);

// ELIMINAR UN PRODUCTO
router.delete('/delete/:id', productsController.destroy);

/* Rutas de usuarios */
router.get('/login', usersController.login);

module.exports = router;
