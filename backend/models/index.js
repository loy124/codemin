const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Seller = require("./seller");
const Room = require("./room");
const Menu = require("./option");
const Image = require("./image");
const Option = require('./option');
const User = require('./user');


const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Seller = Seller;
db.Room = Room;
db.Menu = Menu;
db.Option = Option;
db.Image = Image;

User.init(sequelize);
Seller.init(sequelize);
Room.init(sequelize);
Menu.init(sequelize);
Option.init(sequelize);
Image.init(sequelize);

User.associate(db);
Seller.associate(db);
Room.associate(db);
Menu.associate(db);
Option.associate(db);
Image.associate(db);

module.exports = db;