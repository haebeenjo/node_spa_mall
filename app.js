const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods"); // 외부 모듈의 기능을 가져옴
const cartsRouter = require("./routes/carts.js");

const connect = require("./schemas");
connect();

app.use(express.json()); //req.body를 사용하기 위한 미들웨어 (전역 미들웨어에 적용)
// localhost:3000/api -> goodsRouter
app.use("/api", [goodsRouter, cartsRouter]);  // 전역 미들웨어; 라우터 등록

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

// app.post("/",(req, res) => {
//     console.log(req.body);

//     res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
// });

// app.get("/",(req, res) => {
//     console.log(req.query);

    // res.send('정상적으로 반환되었습니다.');

    // const obj = {
    //     "keykey" : "value 입니다.",
    //     "이름입니다." : "이름일까요?",
    // }
    
//     res.status(400).json({
//         "keykey" : "value 입니다.",
//         "이름입니다." : "이름일까요?",
//     });
// });

// app.get("/:id",(req, res) => {
//     console.log(req.params);

//     res.send(":id URI에 정상적으로 반환되었습니다.");
// });


