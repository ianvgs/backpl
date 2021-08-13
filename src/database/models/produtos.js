'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
   
    static associate(models) {
    Produtos.belongsTo(models.usuarios, {foreignKey: 'userId', as: 'Usuario'})     
    }

  };
  Produtos.init({ 
    quantidade: DataTypes.INTEGER, 
    valor: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'produtos',
    freezeTableName:true
  });
  return Produtos;
};
