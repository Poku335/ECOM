const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// เส้นทาง POST สำหรับการประมวลผลการชำระเงิน
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    // สร้าง PaymentIntent ใหม่โดยใช้ Stripe
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount, // จำนวนเงินที่ต้องการชำระ
      currency: "inr", // สกุลเงิน (รูปีอินเดีย)
      metadata: {
        company: "Omprakash", // ข้อมูลเพิ่มเติมที่ต้องการ
      },
    });
    // ส่งคืน response ที่ประสบความสำเร็จพร้อม client_secret
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

// เส้นทาง GET สำหรับการดึง API key ของ Stripe
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    // ส่งคืน response ที่มี API key ของ Stripe
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
