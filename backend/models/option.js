const Sequelize = require("sequelize");

module.exports = class Option extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        item: {
          type: Sequelize.STRING(200),
        },
      
      },
      {
        sequelize, //해당 부분에 db.sequelize 객체가 들어간다.
        timestamps: true, //true로 하면 createdAt과 updatedAt을 생성한다.
        underscored: true, //기본적으로 테이블명과 컬럼명을 CamelCase로 바꾸는데 snake case로 변경해준다
        paranoid: false, // true로 설정하면 deletedAt 컬럼이 생긴다. 삭제시 완전히 지워지지 않고 deletedAt에 지운시각이 기록된다.
        charset: "utf8mb4", //이모티콘까지 입력되게하려면 utf8mb4와 utf8mb4_general_ci오입력한다
        collate: "utf8mb4_general_ci",
      }
    );
  }
   static associate(db){
    // 이미지들을 가지고 있어야한다.
    db.Option.belongsTo(db.Room, {foreignKey:"room_id", targetKey:"id"});
    
   }

};
