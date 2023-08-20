var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

var instance = new Razorpay({
  key_id: 'rzp_test_6FjaURD1uH91vg',
  key_secret: 'A3Q12Qy1t83qnVooybkx114V',
});


router.post("/create/orderId",function(req,res){
  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  instance.orders.create(options,function(err,order){
    console.log(order)
    res.send(order);
  })
}) 

router.post("/api/payment/verify",function(req,res){
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
  var razorpayOrderId = req.body.response.razorpay_order_id;
  var razorpayPaymentId = req.body.response.razorpay_payment_id;
  var signature = req.body.response.razorpay_signature;
  var secret = "A3Q12Qy1t83qnVooybkx114V";
  var status = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);

  res.send({signatureIsValid : status});
})
module.exports = router; 