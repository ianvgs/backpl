const express = require('./express/index.js')
const db = require('./database/models/index')
const port = process.env.PORT || 3333;


try {  
    //DB.SEQUELIZE.ACAO  

    db.sequelize.authenticate().then(()=>{
        db.sequelize.sync()
        const app = express();
        app.listen(port, ()=>{ console.log(`voê está acessando a porta ${port}`)})
    })     
} catch (error) {
    console.log(error)
}
    






