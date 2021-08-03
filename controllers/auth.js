const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req = request,res = response) => {
    const {id_token} = req.body;
    
    try {
        const {correo,nombre,img} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            console.log(img);
            const data  = {
                nombre,
                correo,
                img,
                password: 'contraseniaDefault',
                google:true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, estado bloqueado.'
            })
        }        
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Usuario/Password no son correctos - correo'
        })
    }
}
module.exports ={
    login,
    googleSignIn
}