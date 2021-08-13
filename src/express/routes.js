const Crud = require('../controllers')
const Auth = require('../controllers/auth');

module.exports = app => {   

  //Cadastro
  app.post('/register/',  async (req, res) => {    
    Crud.registrar(req,res)
  })
  
  //Login
  app.post('/login/',  async (req, res) => { 
    console.log(req.body)    
    Crud.login(req,res)
  })
  
  app.get('/todos/:id', Auth,  async (req, res) => { 
    Crud.listartodos(req,res)
  })  
  app.post('/cadprod/', Auth,  async (req, res) => {    
    Crud.cadprod(req,res)
  }) 

  app.patch('/altprod/', Auth,  async (req, res) => {       
    Crud.altprod(req,res)
  }) 

  app.post('/delprod/', Auth,  async (req, res) => {          
    Crud.delprod(req,res)
  })

}