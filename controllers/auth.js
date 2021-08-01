const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req,res = response ) => {
    const{correo,password} = req.body;

    try {
        const usuario  = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Passwoord no son correctos  - correo'
            })
        }
        if(usuario.estado === false){
            return res.status(400).json({
                msg: 'Usuario / Password  no son correctos - estado:false'
            });
        }

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Passwoord no son correctos  - pass'
            })
        }

        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'contactar administrador'
        })
    }
}

module.exports ={
    login
}