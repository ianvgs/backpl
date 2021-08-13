const db = require('../database/models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { Op } = require("sequelize");

class Crud {   

    async registrar(req, res) {



        console.log(req.body)
        if (req.body.senha !== req.body.confirmaSenha) {
           return res.status(200).json({erro: "Os passwords não coincidem." })
        }        
        const resultados = await db.usuarios.findOne({where: {email:req.body.email}})
        if (resultados) {
            return res.status(200).json({ erro:"E-mail já cadastrado." })
        }
        const nome = req.body.nome;
        const email = req.body.email;
        const senha= req.body.senha;  
        let hashedSenha = await bcrypt.hash(senha, 8);   
        let createdAt =  new Date;
        let updatedAt = new Date;  

        const userinfo = await db.usuarios.create({
            id:'',
            nome:nome,
            senha:hashedSenha,
            email:email,
            createdAt:createdAt,
            updatedAt:updatedAt          
        })

        console.log(userinfo.dataValues.id)
       
        

        return res.json({message:'Cliente Cadastrado com sucesso', userinfo})
    } 
    
    /////////////////////////////////////////////////////////////////////////////////////////   
    async login(req, res) {
        console.log(req.body)
        let email = req.body.email;
        let senha = req.body.senha;
        const resultados = await db.usuarios.findOne({where: {email:email}})        
        if(!resultados){
         return   res.json({erro:"Email não encontrado"})
        }  
        if(resultados) {

            bcrypt.compare(senha, resultados.dataValues.senha, async (erro, result) => {

                if (erro) {
                   return res.status(400).json(erro)                                      
                }
    
                if (result) {                    
                    let token = await jwt.sign({
                        user_id: resultados.dataValues.id,
                        token: true
                    }, process.env.JWT_KEY, 
                    {
                        subject: resultados.dataValues.email,
                        expiresIn: "7000s"
                    });                                     
                    return res.status(201).json({ message: "Usuario logado.", "token": token, "userId":resultados.dataValues.id })
                
                } else {
    
                   return res.status(200).json({erro:"Senhas não bateram."})                    
                }     
            });
        }  
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    async listartodos(req,res){ 

        const resultados = await db.produtos.findAll({attributes: [ 'id','nome', 'descricao','quantidade','valor'], where:{userId:req.params.id}})
        return res.status(200).json({resultados})
    }    

    async cadprod(req,res){
        const {nome,descricao,quantidade,valor} = req.body; 
        const resultados = await db.produtos.create(req.body.newProduto).then(()=>{
            return res.status(200).json({resultados, message:'Produto Cadastrado com sucesso'})
        }).catch(()=>{
            return res.status(200).json({erro:'Os campos nome e descrição devem conter somente letras, e o campo quantidade e valor apenas numeros inteiros.'})
        })
        
    }

    async altprod(req,res){      
        const {nome,descricao,quantidade,valor,id,userId}=req.body.editedContact   
        const pertence = await db.produtos.findOne({
            where: {
            [Op.and]: [
                { id: id },
                { userId: userId }
            ]
            }
            }); 

            if (pertence === null) {
                return res.status(200).json({erro:'Não foi encontrado produto com o ID cadastrado do usuario.'})
            }        
            if(pertence){
                await db.produtos.update({nome:nome,descricao:descricao,quantidade:quantidade,valor:valor},{ where:{id:id}
                }).then((data)=>{                
                    return res.status(200).json({data, message:'Produto Alterado com sucesso'})
                }).catch((err)=>{
                    console.log(err)
                return res.status(200).json({err, erro:'Não foi alterado, tente novamente'})
                });
            } 

    }

    async delprod(req,res){
        console.log(req.body)        
        const {id,userId}=req.body   
        const pertence = await db.produtos.findOne({
        where: {
        [Op.and]: [
            { id: id },
            { userId: userId }
        ]
        }
        }); 
        if (pertence === null) {
            return res.status(200).json({erro:'Não foi encontrado produto com o ID cadastrado do usuario.'})
        }        
        if(pertence){
            await db.produtos.destroy({where:{id:id}
            }).then((data)=>{                
                return res.status(200).json({data, message:'Produto deletado com sucesso'})
            }).catch((err)=>{
                console.log(err)
            return res.status(200).json({err, erro:'Não foi deletado, tente novamente'})
            });
        }
    }

             
        


}
module.exports = new Crud;




