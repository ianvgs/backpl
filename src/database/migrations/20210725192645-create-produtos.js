'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {      
    await queryInterface.createTable('produtos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true        
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.INTEGER,        
        allowNull: false       
      },
      valor: {
        type: Sequelize.INTEGER,        
        allowNull: false       
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model:'usuarios', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },     
      createdAt:{
        type: Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull:false
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('produtos');
    
  }
};
