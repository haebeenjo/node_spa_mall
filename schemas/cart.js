const mongoose = require("mongoose");

// 상품 모델 작성
const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,   // 숫자 타입
    required: true, // 무조건 값이 존재해야만 사용 가능
    unique: true    // 해당하는 값이 고유한 값(중복허용안함)이어야만 사용 가능
  },
  quantity: {
    type: Number,
    required: true,
  }
  
});

module.exports = mongoose.model("Cart", cartSchema);