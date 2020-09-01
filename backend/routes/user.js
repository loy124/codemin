const express = require("express");
const {hashPassword, comparePassword} = require("../utils/bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
    return res.json({hello:"broker"});
});

// 회원가입 
router.post("/",async(req, res) => {
    try {
        // 회원가입 부분
        console.log(req.body);
        const { email, password, name } = req.body;
        if (email && password && name) {
          const hashedPassword = await hashedPassword(password);
          console.log(hashedPassword);
          const data = await User.create({
            email: email,
            password: hashedPassword,
            name: name,
          });
          console.log(data);
          return res.json({ signup: true });
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
        return res.json({ signup: false });
      }
    
});

// 로그인
router.post("/login",async(req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
    
        // 암호화된 비밀번호를 가져온다.
        const userData = await User.findOne({
          attributes: ["id", "password"],
          where: {
            email: email,
          },
        });
        const hashedPassword = userData.dataValues.password;
        console.log(userData);
        // 비밀번호와 암호화된 비밀번호를 대조해야합니다
        const compareResult = await comparePassword(password, hashedPassword);
        console.log(compareResult);
        if (compareResult) {
          return res.json({ login: true, id: userData.dataValues.id });
        } else {
          throw new Error();
        }
      } catch (error) {
        return res.json({ login: false });
      }
}); 



module.exports = router;