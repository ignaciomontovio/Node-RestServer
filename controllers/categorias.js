const { response } = require("express");
const {Categoria} = require('../models');

const obtenerCategorias = async(req , res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const  query ={estado:true}
    const [total,categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre')
            .populate('categoria','nombre')
    ]);
    res.json({
        total,
        categoria
    });
}

const obtenerCategoria = async(req , res = response) => {
    const {id}  = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    if(!categoria.estado){
        res.status(201).json({
            categoria
        })
    }else{
        res.status(201).json({
            categoria
        })
    }
}

const actualizarCategoria = async(req , res = response) => {
    const{id}=req.params;
    const{estado,usuario,...data} = req.body; 
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new : true})
    res.status(201).json({
        categoria
    })
}

const borrarCategoria = async(req , res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});
    res.status(201).json({
        categoria
    })
}

const crearCategoria = async(req , res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    
    const categoriaDB = await Categoria.findOne({nombre});
    
    if(categoriaDB){
        res.status(400).json({
            msg: `La categoria  ${categoriaDB.nombre}, ya existe`
        })
    }
    const data  ={
        nombre,
        usuario:req.usuario._id,
    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria);
}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    crearCategoria
}