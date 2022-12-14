const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// localhost: 3000/api/carts GET Method
router.get("/carts", async(req,res) => {
    const carts = await Cart.find({}); // 장바구니 안에 있는 모든 데이터를 가져온다
    // [
    //    {goodsId, quantity},
    //    {goodsId, quantity},
    // ];
    const goodsIds = carts.map((cart) => {  // 장바구니의 goodsId가 가리키는 상품의 정보를 가져온다 
        return cart.goodsId;                // 상품의 id만 가져와야 함
    })
    // [2, 11, 1];

    const goods = await Goods.find({goodsId: goodsIds}); // goodsId를 통해 해당 상품에 대한 상대 정보를 가져옴
    // Goods에 해당하는 모든 정보를 가지고 올건데,
    // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회하라.

    const results = carts.map((cart) => { // 상세 정보를 가져온 모든 상품(goods)과 조회한 모든 장바구니에 대한 정보(carts)를 가져온 후
        return {
            "quantity" : cart.quantity, // 장바구니의 개수
            "goods" : goods.find((item) => item.goodsId === cart.goodsId), // 장바구니안에 상품정보를 goods라는 키에 넣겠다
        }
    });

    res.json({
        "carts": results,
    })

});

module.exports = router;