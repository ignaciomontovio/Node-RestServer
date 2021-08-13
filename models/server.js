const express = require('express');
var cors = require('cors');
const {dbConnection} = require('../database/config');
const fileUpload = require('express-fileupload');
class Server{
    constructor() {
        this.app = express()
        this.port =process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios',
            uploads: '/api/uploads'
        }

        //Conectar a base de datos
        this.conectarDB();

        this.midddlewares();
        this.routes();
        //this.listen();
    }

    async conectarDB(){
        
        await dbConnection();
    }
    midddlewares(){

        this.app.use(cors());

        
        //Lectura y Parseo
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public')); 

        //Categorias
        // this.app.use(express.static('public')); 
        // Note that this option available for versions 1.0.0 and newer. 
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.uploads,require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto',this.port);
        });
    }
}

module.exports=Server;