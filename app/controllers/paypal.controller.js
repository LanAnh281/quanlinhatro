const con= require('../util/mysql.util');
const ApiError=require('../api_error');

const paypal= require('paypal-rest-sdk');
exports.hien=(req,res,next)=>{
    res.json({hi:"hello"});
}
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUx79GN75wtsieggQqfykauj9mYDTmnb9sWjkkx-qCwP1NiaJX59Kg5jypChJ-mxfpT1lfsbnD52ImEI',
    'client_secret': 'EJMEPqAIH2Goh-iXFt79S18RSpvkH6lkNdF4YD9ClBYn7un_TRsn_47ZdybtHPTS9YnT5gpbsb6_E8la'
  });
exports.taopaypal=(req, res,next) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3001/api/paypal/success",
            "cancel_url": "http://localhost:3000/api/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Iphone 4S",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Iphone 4S cũ giá siêu rẻ"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    // res.redirect(payment.links[i].href);
                    res.send(payment.links[i].href);
                }
            }
        }
    })
}
exports.thanhcong= (req, res) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            // res.send('Success (Mua hàng thành công)');
            res.writeHead(302, {
                'Location': 'http://localhost:3001/admin'
                //add other headers here...
              });
              res.end();
        }
    });
}
exports.thatbai=(req,res) => {
    res.writeHead(302, {
        'Location': 'http://localhost:3001/loaiphong'
        
      });
      res.end();
}