const { response } = require("express");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { Producto } = require('../models');

const crearProducto = async(req,res = response) => {
    const {estado,usuario,...body} = req.body;
    const productoExistente = await Producto.findOne({nombre:body.nombre});
    if(productoExistente){
        res.status(400).json({
            msg:`El producto ${nombre} ya existe en la bd.`
        })
    }
    const data = {
        ...body,
        usuario : req.usuario._id,
        nombre : body.nombre.toUpperCase()
    }
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json({
        producto
    })
}

const obtenerProductos = async(req,res = response) => {
    const {limite,desde} = req.query;
    const productos = await Producto.find({estado:true})
                            .populate('categoria','nombre')
                            .populate('usuario','nombre');
    res.json({
        productos
    })
}

const obtenerProducto = async(req,res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id)
                    .populate('categoria','nombre')
                    .populate('usuario','nombre');
    if(producto.estado)
        res.json({
            producto
        })
    else
        res.status(400).json({
            msg:"El producto esta dado de baja."
        })
}

const actualizarProducto = async (req, res = response) => {
    const {id} = req.params;

    const {usuario,estado,...data} = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json({
        producto
    })
}

const eliminarProducto = async (req, res = response) =>{
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json({
        producto
    })
}

module.exports = {
    actualizarProducto,
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    eliminarProducto
}