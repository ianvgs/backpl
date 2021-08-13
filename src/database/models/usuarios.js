'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
   
    static associate(models) {
      Usuarios.hasMany(models.produtos, {foreignKey: 'userId', as: 'produtos'})
    }
  };
  Usuarios.init({
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email:DataTypes.STRING,
    updatedAt:DataTypes.DATE,
    createdAt:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'usuarios',
    freezeTableName:true
  });
  return Usuarios;
};