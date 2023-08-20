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
  })
}) 
module.exports = router; 