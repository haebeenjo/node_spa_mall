const express = require("express"); //express라는 라이브러리를 express라는 변수에 할당 
const router = express.Router(); //express.Router라는 함수를 실행해서 router라는 변수에 할당

const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];

  //상품 목록 조회 API
  router.get("/goods",(req,res) => {
    // const goods = await Goods.find({}); Rl
    res.status(200).json({goods})
  });

  //상품 상세 조회 API
  router.get("/goods/:goodsId",(req,res) => {
    const { goodsId } = req.params;
    // const result = await Goods.find({goodsId}); Rl
    const [detail] = goods.filter((goods) => Number(goodsId) === good.goodsId);

    res.status(200).json({ detail });
  });

  // 장바구니에 상품 추가 API
  const Cart = require("../schemas/cart.js");
  router.post("/goods/:goodsId/cart", async(req, res) => {
    const {goodsId} = req.params; // const goodsId = req.params.goodsId;
    const {quantity} = req.body;  // const quantity = req.body.quantity;

    const existsCarts = await Cart.find({goodsId}); // 장바구니에 같은 상품이 존재하는지 확인
    if (existsCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
        })
    }
    await Cart.create({goodsId, quantity}); // else문

    res.json({result: "success"});
  })

  // 장바구니의 상품 수량 수정 API
  router.put("/goods/:goodsId/cart", async(req, res) => {
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const existsCarts = await Cart.find({goodsId});
    if(existsCarts.length){
        await Cart.updateOne(
            {goodsId: goodsId},
            {$set: {quantity: quantity}}
        )
    }
    res.status(200).json({success: true});
  })

  // 장바구니의 상품 제거 API
  router.delete("/goods/:goodsId/cart", async (req, res) => {
    const {goodsId} = req.params;

    const existsCarts = await Cart.find({goodsId});
    if (existsCarts.length) {
        await Cart.deleteOne({goodsId});
    }
    res.json({result: "success"});
  })

  // 상품 생성 API
  const Goods = require("../schemas/goods.js");
  router.post("/goods/", async (req,res) => { // 동기적으로 처리(async 사용)
    const {goodsId, name, thumbnailUrl, category, price} = req.body; // req.body를 사용해 데이터 입력 받음
    
    const goods = await Goods.find({ goodsId }); //goodsId에 중복된 값이 있는지 확인, 동기적으로 처리

    if(goods.length) {
        return res.status(400).json({
            success:false,
            errorMessage: "이미 존재하는 GoodsId입니다."
        });
    }

    const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});

    res.json({goods: createdGoods});
  })

module.exports = router; //router라는 변수를 module.exports를 통해서 밖으로 내보냄