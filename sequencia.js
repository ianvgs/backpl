/*src -p controllers
       p database(config/migrations/models/seeders)
       p express
       + server.js
*/


/////controllers/index.js
const db = require('../database/models')
class Crud {
    async cadastrar(req,res){
        const result = await db.User.create({
            firstName: 'ian',
            email:'oi@oi'
        })
        return res.status(200).json(result)
    } 
}
module.exports = new Crud;


/////express/routes.js
const crud = require('../controllers')
module.exports = app => {
    app.post('/cad', (req,res) => {
        console.log(req.body)
        crud.cadastrar(req,res)
    })  
}


/////express/index.js
const express=require('express');
const consign = require('consign')
//só serve pra colocar mais funcoes, tem que chamar () no index igual ao normal
module.exports= () => {    
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    consign()
    .include('./src/express/routes.js') 
    .into(app);
    return app
}


/////.sequelizerc
const path = require('path');
module.exports = {
  'config': path.resolve('src','database','config', 'config.js'),
  'models-path': path.resolve('src','database','models'),
  'seeders-path': path.resolve('src','database', 'seeders'),
  'migrations-path': path.resolve('src','database', 'migrations')
};

/////server.js
const express = require('./express/index.js')
const db = require('./database/models/index')
const port = process.env.PORT || 3333;

try {      
    db.sequelize.authenticate().then(()=>{
        const app = express();
        app.listen(port, ()=>{ console.log(`voê está acessando a porta ${port}`)})
    })     
} catch (error) {
    console.log(error)
}
    
