const {response,request} = require('express');


const usuariosGet = (req  = request, res = response) => {

    const {q,nombre= 'noname',apikey} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,nombre,apikey
    });
}

const usuariosPost  = (req, res = response) => {
    
    
    res.json({
        msg: 'get Post - controlador',
        
    });
}

const usuariosPut  = (req, res = response) => {
    const id  = req.params.id;
    
    res.json({
        msg: 'get Put - controlador',
        id
    });
}

const usuariosPatch  = (req, res = response) => {

    res.json({
        msg: 'get Patch - controlador'
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'Delete Patch - controlador'
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}