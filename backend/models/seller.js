const Sequelize = require("sequelize");

// seller 판매내역 테이블을 가지고 있어야 한다
// 게시글도 가지고있어야 한다
// 1차목표는 게시글을 업로드할때 각각 테이블에 이미지의 주소를 저장해서 올리는것이다.
// 그에 따른 이미지 테이블이 필요하고 이 둘은 관계형으로 엮여 있어야한다 (게시글이 하나일때 이미지는 여러개이므로 1대다 관계 성립)
// 다중 이미지 업로드를 위한 multer 구현이 필요할것으로 예상된다
//
module.exports = class Seller extends Sequelize.Model {
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
  static associate(db){
    db.Seller.hasMany(db.Room, {foreignKey:"seller_id", sourceKey:"id"})
  }
};
