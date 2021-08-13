const { Categoria, Producto, Role, Usuario } = require("../models");

const existeCategoriaPorId = async(id = '')  =>  {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`La cateogoria con id ${id} no existe en la BD.`);
    }
}
 // Verificar si el correo existe
const emailExiste = async(correo = '') => {
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
        // return res.status(400).json({
        //     msg: 'El correo ya esta registrado.'
        // })
        throw new Error(`El correo ${correo} ya existe`);
    }
}

const esRoleValido = async (rol='') => {
    const  existeRol = await Role.findOne({rol});
    if(!existeRol){
          throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario =  await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El ID: ${id}, no existe`);
    }
}
const existeProductoPorId = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id de producto ${id} no existe en la BD`);
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '',colecciones = []) =>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida. [${colecciones}]`)
    }
    return true;
}
module.exports = {
    existeCategoriaPorId,
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoPorId,
    coleccionesPermitidas
}