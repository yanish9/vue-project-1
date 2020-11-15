'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
let config = require(`${__dirname}/../config/config.json`)[env];
if(fs.existsSync(`${__dirname}/../config/config_local.json`)){
  const config_local = require(`${__dirname}/../config/config_local.json`)[env];
  config = Object.assign(config, config_local);
  console.log("loading local JS config")
}
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable], { logging: false }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {logging: false}
  );
}

fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
