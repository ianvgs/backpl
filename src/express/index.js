const express=require('express');
const consign = require('consign')
const cors = require('cors')
//só serve pra colocar mais funcoes, tem que chamar () no index igual ao normal

module.exports= () => {
    const app = express();
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        app.use(cors());
        next();
    }) 
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    consign()
    .include('./src/express/routes.js') 
    .into(app);
    return app
}