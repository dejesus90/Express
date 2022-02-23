const { Sequelize,DataTypes }   = require('sequelize');
  const keyence = new Sequelize('keyence' , 'root', '' , {
    host: '127.0.0.1',
    dialect: 'mysql'
  });

  keyence.dialect.supports.schemas = true; // add this line

  try {
    keyence.authenticate().then( () =>{
        console.log('Connection has been established successfully. (keyence)');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error); 
  }

  const models = require('./models/model');
const db = {
    User    : models.keyenceModels.UserModel(keyence , Sequelize),
}
module.exports = db;