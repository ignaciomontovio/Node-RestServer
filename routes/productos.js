const {Router} = require('express');
const { check } = require('express-validator');
const { obtenerProductos, crearProducto, actualizarProducto, obtenerProducto, eliminarProducto } = require('../controllers/produtos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/:id',[
    check('id','El id de categoria es obligatorio').not().isEmpty(),
    check('id','El id no es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

// obtener todos los productos - publico
router.get('/',obtenerProductos)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria','La categoria no es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id','El id de categoria es obligatorio').not().isEmpty(),
    check('id','El id no es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El id de categoria es obligatorio').not().isEmpty(),
    check('id','El id no es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],eliminarProducto)
module.exports = router;