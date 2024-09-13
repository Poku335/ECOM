const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "กรุณากรอกชื่อสินค้า!"],
  },
  description: {
    type: String,
    required: [true, "กรุณากรอกรายละเอียดสินค้า!"],
  },
  category: {
    type: String,
    required: [true, "กรุณาเลือกหมวดหมู่สินค้า!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "กรุณากรอกราคาสินค้า!"],
  },
  stock: {
    type: Number,
    required: [true, "กรุณากรอกจำนวนสินค้า!"],
  },
  images: [
    {
      type: String,
    },
  ],

  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
