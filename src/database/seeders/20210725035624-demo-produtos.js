'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('produtos', [{       
       
      nome: 'café',
      descricao:'Café em pó ',
      valor:'10',
      userId:'1',
      quantidade:'10',      
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    },


  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('produtos', null, {});
     
  }
};
