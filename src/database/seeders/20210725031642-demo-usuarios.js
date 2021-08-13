'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('usuarios', [{
       nome: 'John Doe',
       senha: '123456',
       email:'Jhon@gmail.com',
       createdAt: new Date(),
       updatedAt:new Date(),
     },{
      nome: 'Maria José',
       senha:'123456',
       email:'Maria@gmail.com',
       createdAt: new Date(),
       updatedAt:new Date(),
    },{
       nome: 'Samara Del Chamado',
       senha:'123456',
       email:'Samy@gmail.com',
       createdAt: new Date(),
       updatedAt:new Date(),
    },
    {
       nome: 'Clayton Alves',
       senha:'123456',
       email:'Cl8iton@gmail.com',
       createdAt: new Date(),
       updatedAt:new Date(),
    },
    
    
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('usuarios', null, {});
     
  }
};
