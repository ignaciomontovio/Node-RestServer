const {Router} = require('express');
const  {check} = require('express-validator');
const { obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    crearCategoria } = require('../controllers/categorias');
const { existeCategoria: existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// obtener todas las categorias - publico
router.get('/',obtenerCategorias)

/// obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

// crear categoria - privado
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

// actualizar categoria - privado
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)

// borrar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)

module.exports = router;