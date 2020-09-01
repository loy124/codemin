const Sequelize = require("sequelize");

// 유저는 구매내역 페이지를 가지고 있어야한다
// 찜한목록도 저장할수있는 테이블이 있으면 좋겠다
// 그에 따라서 테이블을 각자 만들어줘야한다

//
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize, //해당 부분에 db.sequelize 객체가 들어간다.
        timestamps: true, //true로 하면 createdAt과 updatedAt을 생성한다.
        underscored: true, //기본적으로 테이블명과 컬럼명을 CamelCase로 바꾸는데 snake case로 변경해준다
        // modelName: "User", //모델 이름을 설정할 수있다
        // tableName: "User", //기본적으로 모델이름을 소문자및 복수형으로 만드는데 모델이 User면 users가된다
        paranoid: true, // true로 설정하면 deletedAt 컬럼이 생긴다. 삭제시 완전히 지워지지 않고 deletedAt에 지운시각이 기록된다.
        charset: "utf8mb4", //이모티콘까지 입력되게하려면 utf8mb4와 utf8mb4_general_ci오입력한다
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db){}
};
