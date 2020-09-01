const express = require("express");
const { upload } = require("../utils/multer");
const { Post, sequelize, Menu, Image } = require("../models");
const fs = require("fs");
const router = express.Router();

// 전체 게시글 얻기
router.get("/", (req, res) => {
  return res.json({ hello: "post" });
});
// 본인이 올린 게시글 얻기

router.post("/", upload.array("files"), async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, content, userId } = req.body;
    console.log(req.files);
    const post = await Post.create(
      {
        title: title,
        content: content,
        user_id: userId,
      },
      { transaction: transaction }
    );
    console.log(post.dataValues.id);
    const { menuTitle, category } = req.body;
    console.log(menuTitle, category);
    const menu = await Menu.create(
      {
        title: menuTitle,
        category: category,
        post_id: post.dataValues.id,
      },
      { transaction: transaction }
    );
    console.log(menu.dataValues.id);

    // 이제 남은게 이미지 넣기

    if (req.files) {
      await req.files.forEach((li) => {
        Image.create({
          src: li.path,
          menu_id: menu.dataValues.id,
        });
      });
    }
    //     req.files.forEach(li => {
    // await Image.create({
    //     src : li.path,
    //     menu_id :menu.dataValues.id
    // },{transaction:transaction})
    //     });

    // const image = await Image.create({
    //     src : ,
    //     menu_id :menu.dataValues.id
    // })

    // throw new Error();
    // 이제 메뉴등록을 해야한다

    // +
    // 게시글을 작성하면
    // 게시글을 기반으로메뉴를 작성하고
    // 메뉴를 기반으로 파일을 작성하고 업로드 한다는게 정석
    console.log(post);
    console.log(post);
    await transaction.commit();
    return res.json({ upload: true });
    //   이미지들은 table에 입력해야하는데
  } catch (err) {
    await transaction.rollback();
    // 롤백함과 동시에 multer의 파일들도 지워줘야 한다.
    console.log(req.files);
    if (req.files) {
      req.files.forEach((li) => {
        console.log(li.path);
        fs.unlink(li.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
    return res.json({ upload: false });
  }
  // 게시글 업로드하기
  // 이곳에서 DB에 올림과 동시에 같이 올려아한다
  //   유저의 ID도 받아와야한다.
  // userId
});

module.exports = router;