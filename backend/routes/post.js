const express = require("express");
const { upload } = require("../utils/multer");
const { Room, sequelize, Option, Image } = require("../models");
const fs = require("fs").promises;
const router = express.Router();

// 전체 게시글 얻기
router.get("/", async (req, res) => {
 try {
  const data = await Room.findAll({
    include: [{ model: Option }, { model: Image }],
  });
  // const file = await fs.readFile("uploads/bg-sky&&1599284550236.jpg")
  // console.log(file);
  return res.json({ room: data });
 } catch (error) {
   console.log(error);
  return res.json({ room: false });
 }
});

router.get("/images", async(req, res) => {
  // 파일을 읽어서
  try {
    // console.log("오나");
    // console.log(req.params);
    console.log("오나");
    console.log(req.query.src);
    console.log("오나");
    const file = await fs.readFile(req.query.src);
  
    // console.log(req.query);
    return res.send(file);
  } catch (error) {
    return res.json({upload: false})
  }
});

// 본인이 올린 게시글 얻기
router.get("/:id", async (req, res) => {
  const data = await Room.findOne({
    include: [{ model: Option }, { model: Image }],
    where: {
      id: req.params.id,
    },
  });
  console.log(data);
  return res.json({ room: data });
});

// TODO patch로 만들어야하는 로직
// 1. 옵션 업데이트하기
// 2. 파일 업데이트하기
// 3. 게시글 내용 수정하기

router.patch("/:id", async (req, res) => {
  // const data = await Room.update()
  // 필요한 로직
  try {
    const data = await Room.findOne({
      include: [{ model: Option }, { model: Image }],
      where: {
        room_id: req.params.id,
      },
    });
    // console.log(data);
    // const d = await data.Option.destroy({
    //   where: {
    //     id: data[seller_id],
    //   },
    // });
    // console.log(d);
    // 수행해야하는 로직
    // 옵션을 다 지우고 새로 추가한다.
    //
    // data.Model.update()
    // console.log(data.getImage());
    // data.Option
    return res.json({ room: data });
  } catch (error) {
    console.error(error);
    return res.json({ room: false });
  }
  // findOne으로 업데이트하기
  // 파일을 찾아서 업데이트해줌과 동시에
  // 기존파일도 업데이트해줘야한다.
});


router.put("/:id/option", async (req, res) => {
  // 수행해야할 로직

  // 옵션을 업데이트한다.
  const transaction = await sequelize.transaction();
  try {
    // 옵션들 다 지우기
    console.log(req.params);
    const del = await Option.destroy(
      {
        where: {
          room_id: req.params.id,
        },
      },
      { transaction: transaction }
    );
    console.log(del);
    const { options } = req.body;

    console.log(options);
    for (option of options) {
      await Option.create({
        item: option,
        room_id: req.params.id,
      });
    }

    return res.json({ update: true });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.json({ update: false });
  }
});


router.put("/:id/image", upload.array("files"), async (req, res) => {
  // 파일읽어와서 지우고 파일도 지우고
  // 새로 파일도 읽어와서 업데이트하고
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const files = await Image.findAll({
      where: {
        room_id: id,
      },
    });
    console.log(files);

    // 주소 저장하기
    const srcs = files.map((li) => li.dataValues.src);
    // 삭제하기
    srcs.forEach((li) => {
      fs.unlink(li, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    // 지우기
    const deleteImages = await Image.destroy({
      where: {
        room_id: id,
      },
    });
    console.log(deleteImages);
    // 추가하기
    if (req.files) {
      await Promise.all(
        req.files.map(async (li) => {
          await Image.create(
            {
              src: li.path,
              room_id: id,
            },
            { transaction: transaction }
          );
        })
      );
    }
    console.log(srcs);
    transaction.commit();
    return res.json({ update: true });
  } catch (error) {
    await transaction.rollback();
    return res.json({ update: false });
  }
});

router.post("/", upload.array("files"), async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, content, seller_id, address, latitude, longitude } = req.body;
    console.log(req.files);
    console.log("도달");
    const room = await Room.create(
      {
        title: title,
        content: content,
        address: address,
        seller_id: seller_id,
        longitude: longitude,
        latitude: latitude,
      },
      { transaction: transaction }
    );
    console.log(room);
    const { options } = req.body;
    console.log(options);
    console.log(typeof options);
    // // console.log("옵션");
    // // 옵션을 넣고
    // forEach로하면 에러가 발생한다
    if (options) {
      if (typeof options === "string") {
        await Option.create(
          {
            item: options,
            room_id: room.dataValues.id,
          },
          { transaction: transaction }
        );
      } else {
        await Promise.all(
          options.map(async (li) => {
            await Option.create(
              {
                item: li,
                room_id: room.dataValues.id,
              },
              { transaction: transaction }
            );
          })
        );
      }
    }
    // 이미지를 넣는다
    // 이제 남은게 이미지 넣기

    if (req.files) {
      await Promise.all(
        req.files.map(async (li) => {
          await Image.create(
            {
              src: li.path,
              room_id: room.dataValues.id,
            },
            { transaction: transaction }
          );
        })
      );
    }
    // +
    // 게시글을 작성하면
    // 게시글을 기반으로메뉴를 작성하고
    // 메뉴를 기반으로 파일을 작성하고 업로드 한다는게 정석
    // console.log(room);
    await transaction.commit();
    return res.json({ upload: true });
    //   이미지들은 table에 입력해야하는데
  } catch (err) {
    console.log(err);
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
