const role = require("../models/role");
const Usuario = require("../models/usuario");


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
    const  existeRol = await role.findOne({rol});
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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}