const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Seller = require("./seller");
const Post = require("./post");
const Menu = require("./menu");
const Image = require("./image");


const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Seller = Seller;
db.Post = Post;
db.Menu = Menu;
db.Image = Image;

Seller.init(sequelize);
Post.init(sequelize);
Menu.init(sequelize);
Image.init(sequelize);

Seller.associate(db);
Post.associate(db);
Menu.associate(db);
Image.associate(db);


module.exports = db;