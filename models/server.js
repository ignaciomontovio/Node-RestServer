const express = require('express');
var cors = require('cors');
const {dbConnection} = require('../database/config');
class Server{
    constructor() {
        this.app = express()
        this.port =process.env.PORT;

        this.usuariosPath='/api/usuarios';

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
    }

    routes(){
        
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto',this.port);
        });
    }
}

module.exports=Server;