'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('usuarios', { 

      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
        unique:true        
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      senha: {
        type: Sequelize.STRING,        
        allowNull: false               
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull:false
      },
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('usuarios');
    
  }
};
