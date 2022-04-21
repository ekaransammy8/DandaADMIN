//Node js packages started here to use 
var express = require('express');
var app = module.exports = express();
const http = require('https');
//const io = require('socket.io')(http);
var request = require("request");
var unirest = require("unirest");
const stickySession = require('sticky-session');
const redisAdapter = require('socket.io-redis');

const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const redis = require('redis');
const Promise = require('promise');
const cron = require('node-cron');
const con = require('./config/db');
//const con2 = require('./config/db');
const timestamp = require('time-stamp');
const moment = require('moment');
const bodyParser = require('body-parser');
const prettyjson = require('prettyjson');
var formidable = require('formidable');
const fileUpload = require('express-fileupload');
const socketioJwt = require('socketio-jwt');
const jwt = require('jsonwebtoken');

//https config
var fs = require('fs');
/*var ssloptions = {
  key: fs.readFileSync('ssl/private.key','utf8'),
  cert: fs.readFileSync('ssl/traala.crt','utf8')
};*/

/*var httpsServer = require('https').createServer(ssloptions,app);
const ioS = require('socket.io')(httpsServer);
httpsServer.listen(8000);*/






//email
const nodemailer = require('nodemailer');
var Email = require('email-templates');
var path = require('path'); 
var ejs = require("ejs");


//notification
var apn = require('apn');
var FCM = require('fcm-node');



//var serverKey = 'AIzaSyBdabh52RDfx9GM70WjQEoMXKHZeb2R06w'; //put your server key here for android
/*var serverKey = 'AIzaSyCIycxWUbxtc0B5qQN_4UWEQhgOTywq5rY';//server key for driver
var fcm = new FCM(serverKey);*/


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
process.setMaxListeners(0);
process.env.TZ = 'Asia/Calcutta' 

process.env.PORT = process.env.PORT || 1001;
//process.env.HOST = "157.245.108.15";
//process.env.HOST = "103.211.217.134";
//process.env.HOST = "162.144.71.183";
//process.env.HOST = "192.168.1.31";
process.env.HOST = "socket.traala.com";
app.use(morgan('dev'));
app.use(cors());


///home/traalero/public_html/webIO/WebSocket/public
app.use(express.static(__dirname + '/public'));
/*app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');*/
//Above  all node js packages which are used in whole program


/* Code to start listen server on ip address*/

var server = http.createServer({
    key: fs.readFileSync('ssl/private.key','utf8'),
    cert: fs.readFileSync('ssl/certificate.crt','utf8'),
   // ca: fs.readFileSync(/*full path to your intermediate cert*/),
    requestCert: true,
    rejectUnauthorized: false
},app);

server.listen(1003); //listen on port 8080
//console.log("App listening at http://%s:%s", host, port)

var io = require('socket.io').listen(server);
io.adapter.bind(stickySession);
io.adapter(redisAdapter(server));




const transporter = nodemailer.createTransport({
      host: 'mail.traala.com',
      //port: 587,
      //secure: false,
      auth: {
        user: 'noreply@traala.com',
        pass: 'Appzorro@54321'
      }
    });

 

 // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route



app.get('/api', (req, res) => {


   console.log('-----------Received M-Pesa webhook-----------');
  
  // format and dump the request payload recieved from safaricom in the terminal
  ////console.log(prettyjson.render(req.body, options));
  ////console.log('-----------------------');
  
  /*let message = {
    "ResponseCode": "00000000",
    "ResponseDesc": "success"
  };
  
  // respond to safaricom servers with a success message
  res.json(message);*/

});

 //app.post('/api',(req,res)=>{
  //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});

  //req.body.image_name;

  /*let paymentQry = "UPDATE driver SET latitude=?,longitude=? WHERE  id = ?";
                          con.query(paymentQry, [req.body.latitude, req.body.longitude, req.body.driver_id], (err, done) => {
                            if (err) {
                              throw(err);
                            } else {
                              //resolve(done);
                              let updateRideqry ="select status from driver where id= ?";;
                  con.query(updateRideqry, [req.body.driver_id], (err, detail) => {
                    if (err) {
                      throw(err);
                    } else {
                       
                                                                  //  let dataDriver = { detail };
                      ////console.log('dataaaaaa',{ detail });*/

                     /* { driverData: { detail: [ [RowDataPacket] ] } }

                      {"driverData":{"detail":[{"status":1}]}}

                      {"status":1}*/

/*
                  }})

                            }
                          })*/



       /* var ride_detail = "SELECT device_token,device_type,name  FROM driver  WHERE socket_id=?";
        con.query(ride_detail, [req.body.socket_id], (err, detail) => {
          if (err) {
            throw(err);
          } else {
            send_notification_driver(detail);
            
          }
        })*/
       // getCustomercharges(req.body.ride_request_id);

        
        
  

//});

 /*socket.on('callBackUrl', (data) => {
  ////console.log("callBackUrl function ====> ===========",data);
   

  })
*/





function sendMail(data,customer_email){
////console.log("sending mail dataaaaaaaaa=>",data);
if(customer_email!=='')
{
       ejs.renderFile(__dirname + "/invoice.ejs", { 
                                  driver_name: data[0].driver_name,
                                  customer_name: data[0].customer_name,
                                  amount: data[0].amount,
                                  non_tax_amount: data[0].non_tax_amount,
                                  cash_collection: data[0].cash_collection,
                                  non_cash_collection: data[0].non_cash_collection,
                                  tax: data[0].tax,
                                  payment_method: data[0].payment_method,
                                  traala_commision: data[0].traala_commision,
                                  payment_process: data[0].payment_process,
                                  tax_p: data[0].payment_process,
                                  tc_per: data[0].payment_process,
                                  p_process_per: data[0].payment_process,
                                  driver_image: data[0].driver_image,
                                  pickup_location: data[0].pickup_location,
                                  drop_location: data[0].drop_location,
                                  start_date: data[0].start_date,
                                  end_date: data[0].end_date,
                                  start_time: data[0].start_time,
                                  end_time: data[0].end_time,
                                  distance: data[0].distance,
                                  cat_name: data[0].cat_name,
                                  datetime: data[0].datetime,


        }, function (err, data) {
      if (err) {
          console.log(err);
      } else {
          var mainOptions = {
              from: '"Traala" noreply@traala.com',
              to: customer_email,
              subject: 'Trip Details',
              html: data
          };
          //////console.log("html data ======================>", mainOptions.to);
          transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                  console.log("email errr",err);
              } else {
                  console.log('Message sent: ' + info.response);
              }
          });
      }

      });
  }else{
      ////console.log("email not provided");
    }
}

function get_socket_id(data) {
  let socketDriver = socket.id;
  let busy = "0";
  redisData(data.driverSocketId, socketDriver, busy);
   client.hgetall(data.driverSocketId, (err, result) => {
    if (!result) {
                ////console.log("*********get_socket_id*****");
              } else {
                return result.socket;

              }

   })
}

function selectQuery(data,table,where) {
  if (data.company_id==3) {
    var checkBusyDriver = new Promise((resolve, reject) => {
     let getDriver = "SELECT * from ?? where ?";
     //console.log("get selectQuery deliver_dataaaaaaaaaaaaaaaaaaa company_id 3",where)
      con.query(getDriver,[table,where],  (err, result) => {
        if (err) {
         reject(err);
        } else {
              resolve(result);
            }
      })
    })//end promise
    }else{
        //avenue company
        var checkBusyDriver = new Promise((resolve, reject) => {
         let getDriver = "SELECT * from ?? where ?";
         //console.log("get selectQuery deliver_dataaaaaaaaaaaaaaaaaaa company_id 28",where)
          con2.query(getDriver,[table,where],  (err, result) => {
            if (err) {
             reject(err);
            } else {
                  resolve(result);
                }
          })
        })//end promise
    }//end else

}



/*var fulldate = new Date(1558573993*1000);
var start_date = moment(fulldate).format("HH:mm");//01:13:13

var fulldate2 = new Date(1558575030*1000);
var end_date = moment(fulldate2).format("HH:mm");//01:30:30


var data=moment.utc(moment(end_date,"HH:mm").diff(moment(start_date,"HH:mm"))).format("HH:mm");

////console.log(data);
if(data >('00:20'))
{
  ////console.log("greater");
}else{
  ////console.log("lesser");
}
*/




/*var options = {
  token: {
     //key: "./AuthKey_MWBYC2LT97.p8",//sendbox file(customer)
    key: "./AuthKey_9D95RV4592.p8",//production file(customer)
   //key: "./prod/AuthKey_9D95RV4592.p8",//production file(customer)
    keyId: "9D95RV4592",
    teamId: "K786494EGJ"
  },
  production: true
};

var apnProvider = new apn.Provider(options);*/

//Here start connection established to redis database to node js 
const client = redis.createClient();
client.on('connect', (req, res) => {
  console.log("Redis Database  is connected....");
})

// Cron job for clear cache from redis data base

 // Clear redis cache from redis database 
cron.schedule("59 23 * * *",() =>{

client.flushall( function (err, succeeded){
  if(err){
    //console.log("Error..........",err);
  }else{
    //console.log("data deleted using cron job",succeeded); // will be true if successfull
  }
      
  });

});

//fcm_customer
//blah2
function send_notification_driver(data)
{
 console.log("send_notification_driver",data.noti_type);
 //var serverKey = 'AIzaSyCIycxWUbxtc0B5qQN_4UWEQhgOTywq5rY'; //server key here for android(customer)
 var serverKey = 'AAAAra1XVCo:APA91bEbf4pkWcw5_ViNFjegz0TZBFdeAMk7FRF2kvyvBDibJWMCEBVPF46mPfJARHivHhJVhpyxsepUbQmmuih5GpJYenZExprjxvDyqILDgmqb7JvQ9u-aUqfxUz_-hiaQIo_Bd_HT'; //server key here for android(customer)
    var fcm = new FCM(serverKey);

  
  var get_device = new Promise((resolve, reject) => {
    let updateQry = "select name,device_type,device_token,socket_id from driver where socket_id= ?";
    con.query(updateQry, [data.driverSocketId], (err, result) => {
      if (err) {
        reject(err);
      } else {
         resolve(result);
        
      }

    })

  })


    get_device.then((result) => {
      console.log("send_notification=======================>",result[0].device_type);
      if(result[0].device_type=='A')
      {
        
              //////console.log(result[0].device_token);
              var dis_message;
              var noti_type;
              if(data.status==0)
              {
                console.log("driver_offline")
                 noti_type='driver_offline';
                 dis_message= 'Hello '+result[0].name+' You went Offline due to inactivity or any other reason , Please open app and  get online to begin taking rides  again';

                  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                  to: result[0].device_token, 
                  collapse_key: 'your_collapse_key',
                  
                 /* notification: {
                      title: message, 
                      body: message
                  },*/
                  
                  data: {  //you can send only notification or only data(or include both)
                    noti_type: noti_type,
                    dis_message: dis_message
                }
                 


                };
              }else if(data.status==1){
                console.log("driver_online")
                 noti_type='driver_online';
                //////console.log('sfdsfffffffffffffffffff',data.status);
                dis_message= 'Hello '+result[0].name+' You come Online and ready to get rides'

                 var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                  to: result[0].device_token, 
                  collapse_key: 'your_collapse_key',
                  
                 /* notification: {
                      title: message, 
                      body: message
                  },*/
                  
                  data: {  //you can send only notification or only data(or include both)
                    noti_type: noti_type,
                    dis_message: dis_message
                }
                 


              };
              }else if(data.noti_type=='chat_message_customer'){
                console.log("chat_message_customer")
                     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                      to: result[0].device_token, 
                      collapse_key: 'your_collapse_key',
                      
                     /* notification: {
                          title: message, 
                          body: message
                      },*/
                      
                      data:data
                     


                  };

              }else if(data.noti_type=='chat_message_driver')
              {
                 console.log("chat_message_driver")
                     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                      to: result[0].device_token, 
                      collapse_key: 'your_collapse_key',
                      
                     /* notification: {
                          title: message, 
                          body: message
                      },*/
                      
                      data:data
                     


                  };

              }
            
              //send notification
             
               //////console.log("noti data==============>",data);
              
              fcm.send(message, function(err, response){
                  if (err) {
                      console.log("Something has gone wrong!",err);
                  } else {
                    console.log("Successfully sent with response android: ", response);
                       //io.to(customerSocket).emit('notification', response);
                  }
              });

             
              
           
      }else{
            //ios device
            let deviceToken = result[0].device_token;
            //////console.log("ios device_token================>",data.noti_type);


           // Prepare the notifications
           let notification = new apn.Notification();
           notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
           notification.badge = 1;
           notification.sound = "ping.aiff";
           notification.alert = message;
           notification.title = "";
           notification.body = data.message;

          notification.payload = {'data': data};
          
          // Replace this with your app bundle ID:
           notification.topic = "com.cabscoutcustomer.apps";

            apnProvider.send(notification, deviceToken, function(err, response){
                  if (err) {
                      ////console.log("Something has gone wrong!",err);
                  } else {
                      ////console.log("Successfully sent with response ios: ", response);
                       //io.to(customerSocket).emit('notification', response);
                  }
              });
           
           
          // Close the server
           apnProvider.shutdown(); 

      }
     
      
    }).catch((err) => {
      console.log("error in catch using send_notification function Promise", err);
      throw err;
    })
     
  

}


/* Get driver list from mysql database and emit this data to customer socket id */

function getDriverList(data, customerSocket, type) {
  ////console.log("get driver list=====",customerSocket);
  let getDriver = "SELECT vc.vehicle_name as category_name,s.service_type as service_name,rr.ride_request_id,rr.customer_status,rr.customer_id,rr.driver_id,rr.ride_accept_time,rd.vehicle_id,rd.vehicle_type as category_id,rd.service_id as service_type,rd.pickup_cordinates,rd.drop_cordinates,rd.drop_location,rd.pickup_location,rd.datetime,rd.price,rd.payment_type,rd.vehicle_type,d.id,d.name,d.socket_id,d.profile_pic,d.mobile,d.latitude,d.longitude,dvd.plate_no,dvd.vehicle_name, IF(round(avg(fd.rating),2)  IS NULL,'0.0',round(avg(fd.rating),2)) as overall_rating FROM  ride_request as rr JOIN request_driver as rd on rd.id=rr.ride_request_id JOIN driver as d on d.id=rr.driver_id left JOIN driver_vehicle_details as dvd on dvd.driver_id=d.id left JOIN feedback_from_customer as fd on fd.driver_id=rr.driver_id   join service as s on s.id=rd.service_id LEFT JOIN vehicle_category as vc ON vc.vehicleCategory_id = rd.vehicle_type  WHERE (rr.status=1 or rr.status=4) AND rr.customer_id=? GROUP by rr.driver_id";
  con.query(getDriver, [data.customerID,data.driver_id], (err, result) => {
    if (err) {
      ////console.log("No driver List found to this customer using getDriverList function");
    } else {
        ////console.log('get driver list result=================>',result);
      
       let customerData;
      customerData = { result };
      let dataCustomer = { customerData };
      io.to(customerSocket).emit('driverList', dataCustomer);

    }
  })

}

//End of get Driver List here

/* Get delivery Items from mysql and emit this to driver socket id */

function getDeliveryItems(data) {
  var deliveryItems = new Promise((resolve, reject) => {
    var deliveryRideRequest;
      ////console.log("vehicle_type 43",data);
      deliveryRideRequest = "SELECT d.seat_delivery_avail,vc.vehicle_name as category_name,s.service_type as service_name,rr.ride_request_id,rr.image_upload_status,rd.retry_count,rd.product_type as product_return_type,rd.vehicle_type as category_id,rd.service_id as service_type,rr.customer_status,rd.promo_id,rd.deliver_id,rd.start_time,rd.end_time,rd.price,rd.payment_type,rd.pickup_cordinates, rd.pickup_location,rd.drop_location,rd.drop_cordinates,pl.location as pikup_location,pl.full_address as pickup_full_address,pl.mobile as sender_mobile,pl.email as sender_email,pl.name as sender_name,pl.lat as pickup_lat,pl.lng as pickup_lng, dl.location as drp_location,dl.full_address as drop_full_address,dl.mobile as receiver_mobile,dl.email as receiver_email,dl.name as receiver_name,dl.lat as drop_lat,dl.lng as drop_lng,dl.type,dd.receiver_id,dd.created_at,prod.product_name,prod.product_type,prod.product_descri as product_description,pw.range as weight_range,pw.price as weight_price,c.name as customer_name,c.mobile as customer_mobile,c.id as customer_id,c.profile_pic as customer_pic,c.socket_id,IF(recvr_cus.socket_id  IS NULL,'0',recvr_cus.socket_id) as receiver_socket_id FROM ride_request as rr left join request_driver as rd on rd.id=rr.ride_request_id left join delivery_data as dd on rd.deliver_id=dd.deliver_id left join delivery_items_weight as pw on pw.id=dd.product_weight_id left join saved_delivery_locations as pl on dd.pickup_id=pl.id  left join saved_delivery_locations as dl on dd.destination_id=dl.id left join saved_product_info as prod on dd.product_id=prod.id left join customer as c on rr.customer_id=c.id  left join customer as recvr_cus on dd.receiver_id=recvr_cus.id left join service as s on s.id=rd.service_id LEFT JOIN vehicle_category as vc ON vc.vehicleCategory_id = rd.vehicle_type LEFT JOIN driver AS d ON d.id = rr.driver_id  WHERE   rr.status!=3  AND rr.status!=2 AND rr.customer_status!= 0 AND rd.vehicle_type=?   AND rr.driver_id=?";
    

    

   /* SELECT ride_request.ride_request_id,request_driver.promo_id,request_driver.deliver_id,request_driver.start_time,request_driver.end_time,request_driver.price,request_driver.payment_type,request_driver.pickup_cordinates, request_driver.pickup_location,request_driver.drop_location,request_driver.drop_cordinates,s_loc.*,s_product.*,s_product.product_descri as product_description,pw.range as weight_range,pw.price as weight_price,s.location as desti_location,s.full_address as desti_full_address,s.lat as desti_lat,s.lng as desti_log,s.name as deliver_to,s.mobile as receiver_mobile,dd.receiver_id,ride_request.customer_id AS customer_id,customer.name as sender_name,customer.profile_pic as sender_image,customer.socket_id,customer.mobile as sender_mobile, ride_request.vehicle_type,ride_request.customer_status,IF(recvr_cus.socket_id  IS NULL,'0',recvr_cus.socket_id) as receiver_socket_id 
FROM ride_request left join request_driver on request_driver.id=ride_request.ride_request_id
        left join delivery_data as dd on request_driver.deliver_id=dd.deliver_id 
        left join delivery_items_weight as pw on pw.id=dd.product_weight_id
        left join saved_delivery_locations as s_loc on dd.pickup_id=s_loc.id
        left join saved_delivery_locations as s on dd.destination_id=s.id
        left join saved_product_info as s_product on dd.product_id=s_product.id
        left join customer  on request_driver.customer_id=customer.id
        left join customer as recvr_cus on dd.receiver_id=recvr_cus.id
    WHERE   ride_request.status!=3  AND ride_request.status!=2 AND ride_request.customer_status!= 0 AND ride_request.vehicle_type=44   AND ride_request.driver_id=215*/

    con.query(deliveryRideRequest, [data.vehicle_type,data.driver_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

  deliveryItems.then((result) => {
   

    client.hgetall(data.driverSocketId, (err, driverSocket) => {
      if (!driverSocket) {
        //console.log("No driver socket id found to this ", err);
      } else {
       // console.log("deliveryList 44-------------->",result);
        let customerData;
        customerData = { result };
        let dataCustomer = { customerData };
        io.to(driverSocket.socket).emit('deliveryList', dataCustomer);

      }
    })



  }).catch((err) => {
    console.log("Error........", err);
    throw err;
  })

}





//Get customer of pool ride 

/* Get list of customers from mysql emit to driver socekt id in pool ride*/

function poolCustomerList(data) {

  var poolCustomers = new Promise((resolve, reject) => {

    var poolRideRequest = "SELECT d.seat_pool_avail,s.service_type as service_name,vc.vehicle_name as category_name,rr.ride_request_id, rr.customer_status,rd.start_time,rd.end_time,rd.promo_id,rd.price,rd.payment_type,rd.pickup_cordinates, rd.pickup_location,rd.drop_location,rd.drop_cordinates,rr.customer_id AS customer_id,c.name as customer_name,c.profile_pic as customer_pic,c.mobile as customer_mobile,c.socket_id,rd.vehicle_type as category_id,rd.service_id as service_type,rr.customer_status FROM ride_request as rr JOIN request_driver as rd on rd.id=rr.ride_request_id JOIN customer as c on c.id=rr.customer_id JOIN service as s on s.id=rd.service_id JOIN vehicle_category as vc on vc.vehicleCategory_id=rd.vehicle_type JOIN driver AS d ON d.id = rr.driver_id     WHERE   rr.status!=3  AND rr.status!=2  AND  rr.customer_status!= 0  AND rd.vehicle_type=4 && rr.driver_id=?";
    con.query(poolRideRequest, [data.driver_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

  poolCustomers.then((result) => {
   
    client.hgetall(data.driverSocketId, (err, driverSocket) => {
      if (!driverSocket) {
        ////console.log("No driver socket id found to this ", err);
      } else {
        let customerData;
        customerData = { result };
        let dataCustomer = { customerData };
        io.to(driverSocket.socket).emit('poolCustomerList', dataCustomer);
        let busy = "0";
        updateDriverStatusRedis(data.driverSocketId, driverSocket.socket, busy);
      }
    })


  }).catch((err) => {
    console.log("Error........", err);
  })

}

//emit callback url

function callBackUrldata(data) {
 ////console.log("Revert callBackUrl dataaaaaaaaa",data);
  var poolCustomers = new Promise((resolve, reject) => {

    var poolRideRequest = "SELECT payment_status FROM `payment_by_customer` where ride_id=?";
    con.query(poolRideRequest,[data.ride_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

  poolCustomers.then((result) => {
   
    client.hgetall(data.customerSocketId, (err, customerSocket) => {
      if (!customerSocket) {
        ////console.log("No customer socket id found to this ", err);
      } else {
        let customerData;
        customerData = { result };
        let dataCustomer = { customerData };
        ////console.log("calllbackkkurll dataaa",dataCustomer);
        io.to(customerSocket.socket).emit('callBackUrl', dataCustomer);
        let busy = "0";
        updateDriverStatusRedis(data.customerSocketId, customerSocket.socket, busy);
      }
    })


  }).catch((err) => {
    console.log("Error........", err);
  })

}

function showOnline(data) {
 //console.log("showOnline dataaaaaaaaa",data);
 let table=(data.message_from==1)?'customer':'driver';
 //console.log("table isssssssss",table)
 //let id=(data.message_from==1)?data.customerID:data.driver_id;
  var poolCustomers = new Promise((resolve, reject) => {

    var poolRideRequest = "update ?? set  isOnChatScreen=? where id=?";
    con.query(poolRideRequest,[table,data.is_online,data.user_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

  poolCustomers.then((result) => {
       fetchStatus(data)

  }).catch((err) => {
     console.log("Error........", err);
  })

}

function fetchStatus(data) {
   //get opposite party online status to know is he on same screen or not if online then sm scrn else not
  let tbl=(data.message_from=='1')?'driver':'customer';
   var fetchchat = new Promise((resolve, reject) => {
    
    var fetchChat = "SELECT id,isOnChatScreen FROM ??   WHERE id=?" ;
    ////console.log("where conditonnnnnn",tbl);
    con.query(fetchChat,[tbl,data.opposite_user_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

     fetchchat.then((result) => {

      //console.log("fetch statussssssssssss",result);
     if (data.message_from==1) {
      //emit to customer that driver is on same screen or not
      //console.log("emit to driver only");
     // sendDataObjResCustomer(result,data.customerSocketId,'showOnline');
      sendDataObjResDriver(data,data.driverSocketId,'showOnline');

     }else{
      //emit to driver that customer is on sm scrn or not
      //console.log("emit to customer only");
     // sendDataObjResDriver(result,data.driverSocketId,'showOnline');
      sendDataObjResCustomer(data,data.customerSocketId,'showOnline');
     }
      
   
    }).catch((err) => {
      console.log("Error........", err);
     
    })
  
}




//End of pool ride get customer

// Get customer detail from mysql database;

/* Get list of customers from mysql emit to driver socekt id in regular ride*/

function getCustomerList(data) {
 //////console.log('get customer list apiiiiiiiiiiiiiiiiiiii',data);
  var getRideRequestId = new Promise((resolve, reject) => {

    let rideRequst = "SELECT s.service_type as service_name,vc.vehicle_name as category_name,rr.ride_request_id,rr.ride_accept_time,rr.customer_status,rd.promo_id,rd.price,rd.start_time,rd.end_time,rd.payment_type,rd.pickup_cordinates, rd.pickup_location,rd.drop_location,rd.drop_cordinates,rr.customer_status,rd.vehicle_type as category_id,rd.service_id as service_type,rr.customer_id AS customer_id,c.name as customer_name,c.profile_pic as customer_pic,c.mobile as customer_mobile,c.socket_id FROM customer as c join ride_request as rr on rr.customer_id=c.id join request_driver as rd on rr.ride_request_id=rd.id join vehicle_category as vc on vc.vehicleCategory_id=rd.vehicle_type join service as s on s.id=rd.service_id WHERE  rr.status!=3  AND rr.status!=2 AND rr.customer_status!= 0  AND rd.vehicle_type!=4   and rr.driver_id=? ORDER BY rr.ride_request_id ASC";

    con.query(rideRequst, [data.driver_id], (err, data) => {
      if (err) {

        reject(err);
      } else {
        //////console.log("customer list deliver_dataaaaaaaaaaaaaaaaaaaa",data);
        resolve(data);
      }
    })

  })



  getRideRequestId.then((result) => {

    //send_sms(data.driverSocketId,data.message,'driver');

   
    client.hgetall(data.driverSocketId, (err, socketDriver) => {
       if (!socketDriver) {
        ////console.log("No socket id found to this driver socket id",err);
      } else {
        ////console.log("getCustomerList emit on driver socket id ========================>",socketDriver);
        let customerData;
        customerData = { result };
        let dataCustomer = { customerData };
        io.to(socketDriver.socket).emit('getCustomerList', dataCustomer); // Driver emit and on function
        let busy = "0";
        updateDriverStatusRedis(data.driverSocketId, socketDriver.socket, busy);

      }
    })
  }).catch((err) => {
    console.log("Error..........", err);
    throw err;
  })
}

function getCustomercharges(data,charges,type) {
  
  //console.log("getCustomercharges chargesssssssssssssssssssss=======================",data);
   var get_data = new Promise((resolve, reject) => {

    var ride_detail = "SELECT *  FROM ride_request as rr join pricing as p on rr.vehicle_data_id=p.car_type  WHERE ride_request_id=?";
    con.query(ride_detail, [data.ride_request_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

   get_data.then((result) => {
        var fulldate = new Date(result[0].ride_accept_time*1000);
        var start_date = moment(fulldate).format("HH:mm");//01:13:13
        ////console.log("start date",start_date);

        var fulldate2 = new Date(data.cancel_ride_time*1000);
        var end_date = moment(fulldate2).format("HH:mm");//01:30:30
        ////console.log("end date",end_date);

       var charges=result[0].set_minimum;

       ////console.log("dataaaaaaaaa",charges);

      var diff=moment.utc(moment(end_date,"HH:mm").diff(moment(start_date,"HH:mm"))).format("HH:mm");
      console.log("time diff is==>",diff);

      //if(diff >=('00:01'))
      if(data.timer =='1') //if timer value is 1 then take the cancelation charges from customer
      {
         console.log("time is greater than 2 min========>" ,data);
         var ride_detail = "SELECT *  FROM preferences where location_id=?";
          con.query(ride_detail,[data.location_id],(err, detail) => {
          if (err) {
            reject(err);
          } else {


            var cgst_tax,sgst_tax;
             
            //tax deduct
               if(type=='delivery')
               {
                    //calculate dilevery tax
                     cgst_tax=detail[0]['dil_cgst'];
                     sgst_tax=detail[0]['dil_sgst'];

               }else{
                      
                        //normal ride tax
                      cgst_tax=detail[0]['cgst'];
                      sgst_tax=detail[0]['sgst'];
                 }
            var tax_p2= +cgst_tax+ +sgst_tax;
            var tax_p= tax_p2.toFixed(2);
            var cgst_tax_amount = (cgst_tax / 100) * charges;
            var sgst_tax_amount = (sgst_tax / 100) * charges;

            var tax2= +cgst_tax_amount+ +sgst_tax_amount;
            var tax= tax2.toFixed(2);

           


            //traala commision
            var traala_fee=detail[0]['commision'];
            var traala_commision2 = (traala_fee / 100) * charges;
            var traala_commision = traala_commision2.toFixed(2);
            

          
            //amunt after payment process
            var pp=detail[0]['payment_process'];
            var payment_process2=(pp / 100) * charges;
            var payment_process=payment_process2.toFixed(2);

         
            var non_tax_amount=charges-traala_commision-tax-payment_process;
            var pay_to_driver= non_tax_amount.toFixed(2);

            var trans = {
                          "driver_id": data.driver_id,
                          "customerID":data.customerID,
                          "ride_id": data.ride_request_id,
                          "amount": charges,
                          "payment_status": '0',
                          "paymentType": data.payment_method,
                          "datetime": data.datetime,
                          "currency": 'inr',
                          "non_tax_amount": non_tax_amount,
                          "tax":tax,
                          "traala_commision":traala_commision,
                          "payment_process": payment_process,
                          "tax_per": tax_p,
                          "traala_commision_per": traala_fee,
                          "payment_process_per": pp,
                          "pay_to_driver": pay_to_driver,
                          //"cash_collection":charges,
                          "non_cash":'0.00',
                        };

                     
            
                 cancel_ride_payment(trans,data.noti_type); 
              
          }
        })

        
        
      }else{
        console.log('time is less than 2');
      }


  }).catch((err) => {
    console.log("Error........", err);
  })



  
}


function cancel_ride_payment(data,type)
{
   //console.log("cancel rideeeeeeeee",data);
   var paymentByCustomer2 = new Promise((resolve, reject) => {

  let updateRideqry ="select ride_id from payment_by_customer where ride_id= ?";
  con.query(updateRideqry, [data.ride_id], (err, detail) => {
     if (err) {
          //reject(err);
          throw(err)
        } else{

           //console.log("inserTTTTTTTTTTTTt dataaa");
                 if(detail == ''){
                    let paymentQry = "INSERT INTO payment_by_customer(driver_id,customer_id,ride_id,amount,payment_status,payment_method,created,currency,non_tax_amount,tax,traala_commision,payment_process,tax_p,tc_per,p_process_per,pay_to_driver) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                      con.query(paymentQry, [data.driver_id, data.customerID, data.ride_id, data.amount, data.payment_status,data.paymentType, data.datetime, data.currency, data.non_tax_amount, data.tax,data.traala_commision,data.payment_process,data.tax_per,data.traala_commision_per,data.payment_process_per,data.pay_to_driver], (err, done) => {
                        if (err) {
                         // reject(err);
                         throw(err)
                        } else {
                          resolve(done);
                        }
                      })

                }else{
                   
                   //console.log("updateeeeeeeeeeeeeeeeeeeee dataaaaaaaaaa")
                   let paymentQry = "UPDATE payment_by_customer SET driver_id=?,customer_id=?,amount=?,payment_status=?,payment_method=?,created=?,currency=?,tax=?,traala_commision=? ,payment_process=?,tc_per=?,p_process_per=?,pay_to_driver=? WHERE  ride_id = ?";
                    con.query(paymentQry, [data.driver_id, data.customerID, data.amount, data.payment_status,data.paymentType, data.datetime, data.currency, data.non_tax_amount, data.tax,data.traala_commision,data.payment_process,data.tax_per,data.traala_commision_per,data.payment_process_per,data.pay_to_driver,data.ride_id], (err, done) => {
                      if (err) {
                        //reject(err);
                        throw(err);
                      } else {
                        resolve(done);
                      }
                    })


                 
                 }//end else
        }//end outer else

  })

   

  })

  

  function updateDriverPayout(payout) {  
    //console.log("dfgdgdfffffffffffffffffff>",payout);
   return new Promise((resolve, reject) => {
    
      let updateRideqry ="select * from driver_payout where driver_id= ?";;
      con.query(updateRideqry, [payout.driver_id], (err, detail) => {
        if (err) {
          reject(err);
        } else {
          ////console.log('dataaaaaa',detail);
          //resolve(detail);
         
          if(detail == '')
          {
           
             var oldpayout= payout.pay_to_driver;
           
              var final_payoutt= oldpayout; //for cancel ride driver earning in +ve
           
            
            
            var driverFeedBackPromise = new Promise((resolve, reject) => {
              let feedBackQry = "INSERT INTO driver_payout(driver_id,payout) VALUES(?,?)";
              con.query(feedBackQry, [payout.driver_id, final_payoutt], (err, result) => {
                if (err) {
                 
                  reject(err);
                } else {
                  
                  resolve(result);
                }
              })

            })


          }else{
                //update payout
                 var oldpayout=detail[0].payout;
                 var new_payout= +oldpayout+ +payout.pay_to_driver;
                
                  var final_payoutt= new_payout.toFixed(2);
                  ////console.log("amount without promo update",final_payoutt);
              
               
                let updateRideqry = "UPDATE driver_payout SET payout=? WHERE  driver_id = ?";
                  con.query(updateRideqry, [final_payoutt, detail[0].driver_id], (err, detail) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(detail);
                    }
                  })

          }

        
        }
      })
   


    })//end promise

  }

  

  paymentByCustomer2.then((done) => {
    return updateDriverPayout(data);
  }).then((promiseDone) => {
    if(data.paymentType==3){
     return get_customer_wallet(data);
    }
  }).then((Done) => {
    return remove_promo(data);
  }).catch((err) => {
    console.log("This is error in cancel ride charges error", err);
    throw err;
  })


}
//empty promo of customer if cancel ride
function remove_promo(promo) {

    return new Promise((resolve, reject) => {
       
    var qry2 = "UPDATE customer SET  promo_id=0 WHERE id = ?";
       

      con.query(qry2, [promo.customerID], (err, qry2updated) => {
        if (err) {
          reject(err);
        } else {
          resolve(qry2updated);
        }

      })


    })

  
}


/* Insert feed back from driver */
function driverFeedBack(data) {
let datetime=Math.floor(Date.now() / 1000);
  var driverFeedBackPromise = new Promise((resolve, reject) => {
    let feedBackQry = "INSERT INTO feedback_from_driver(driver_id,customer_id,rating,feedback,ride_request_id,feedback_time) VALUES(?,?,?,?,?,?)";
    con.query(feedBackQry, [data.driver_id, data.customer_id, data.rating, data.feedback, data.ride_request_id,datetime], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })


  driverFeedBackPromise.then((done) => {
    ////console.log("Successfully completed using driverFeedBack function");
  }).catch((err) => {
    console.log("Error........", err);
    throw err;
  })
}


/* Update customer Status in mysql  */

function customerStatus(data, driverSocket, type) {

  var customerPromise = new Promise((resolve, reject) => {

    let Qry = "SELECT ride_request_id,price,payment_type,pickup_cordinates,pickup_location,drop_location,drop_cordinates,customer_id AS customer_id,name,profile_pic,mobile,socket_id,vehicle_type,customer_status FROM ride_request ,request_driver ,customer WHERE request_driver.id= ride_request.ride_request_id  AND request_driver.customer_id=customer.id AND ride_request.driver_id=? AND ride_request.status!=5 AND  ride_request.status!=3 AND ride_request.status!=2 AND  ride_request.customer_status!= 0 AND ride_request.customer_status!= 4 AND request_driver.vehicle_type!=4  ORDER BY ride_request.ride_request_id ASC";

    con.query(Qry, [data.driver_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

    customerPromise.then((detail) => {
      ////console.log("After completion of promise of customer using customerStatus function");
    }).catch((err) => {
      console.log("Error.......", err);
      throw err;
    })

  })


}

/*Reverse redis key value store socket.id as key and socketId as value */

function reverseRedisValueKey(socket, id) {
  client.hmset(socket, ["id", id], (err, response) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}


/* To save customerScoketId  and driverSocketId in redis cache  Database*/

function redisData(id, socket, busy) {

  client.hmset(id, ["socket", socket, "busy", busy], (err, response) => {
    if (err) {
      return false;
      ////console.log("error in setting redisData");
    } else {
      return true;
      ////console.log("succeeded in setting redisData");
    }
  });

}



/* Save client socket id in every 15 seconds  */
function redisSocket(id, socket) {

  client.hmset(id, ["socket", socket], (err, response) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  })
}

/* Update driver status in redis database to make driver busy(busy = 1) if driver get notification 
   for 10 seconds else driver  status  will be busy=0 in redis data base
 */
function updateDriverStatusRedis(driverSocketId, socket, busy) {
 //////console.log("cancel booookingggggggg deliver_dataaaaaaaaaaaaaaaaaaa",busy);
  client.hmset(driverSocketId, ["socket", socket, "busy", busy], (err, appended) => {
    if (err) {
      ////console.log("There is error to update in redis database", err);
    } else {
      ////console.log("Data is append in updateDriverStatusRedis socket method");
    }
  })
}

/* Updated driver status is done in redis*/

/* Update driver status in between on going ride */

function updateDriverStatus(status, driverSocketId) {

  var selectQuery = "UPDATE driver SET status=? where socket_id = ?";
  con.query(selectQuery, [status, driverSocketId], (err, updated) => {
    if (err) {
      throw err;
      return false;
    } else {
      ////console.log("Driver status updated in onlineDriver table.");
      return true;
    }
  })


}
/* Updation of driver status ends here */



function sendsmsGET(mobileNumber,message)
{ 
   
    //var req = unirest("GET", "http://54.36.26.171/rest/services/sendSMS/sendGroupSms");
    var req = unirest("GET", "http://bulksms.bulksmsvalue.com/rest/services/sendSMS/sendGroupSms");

    req.query({
           AUTH_KEY: '1e8adfa361924d22ead3185d918876b',
           message: message,
           senderId: 'TRAALA',
           routeId: '1',
           mobileNos: mobileNumber,
           smsContentType: 'english' 
    });

    req.headers({
      "Cache-Control": "no-cache"
    });


    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      ////console.log(res.body);
      
    }); 


}


//Rquest Ride accepted by driver to update data in mysql database.

function requestAcceptedByDriver(data, customerSocket, type) {
  
  console.log("request accepted by driver=============>",customerSocket);

  var promiseDel = new Promise((resolve, reject) => {
    let delQry = "DELETE FROM ride_request WHERE ride_request_id=? AND driver_id !=?";
    con.query(delQry, [data.ride_request_id, data.driver_id], (err, del) => {
      if (err) {
        reject(err);
      } else {
        resolve(del);
      }
    })
  })


  function promiseUpdate(data) {
    return new Promise((resolve, reject) => {


      let updateQry = "UPDATE ride_request SET status=1, customer_status=1 ,ride_accept_time=? WHERE ride_request_id=? AND driver_id = ? AND customer_id = ?";
      con.query(updateQry, [data.ride_accept_time,data.ride_request_id, data.driver_id, data.customerID], (err, updated) => {
        if (err) {
          reject(err);
        } else {
          resolve(updated);
        }
      })
    })
  }



  function updateVehicleType(qry) {

    con.query(qry, [data.vehicle_type,data.ride_request_id], (err, updateVehicleType) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    })

     }


  function promiseTypeUpdate(type) {

    return new Promise((resolve, reject) => {
      var qry2, qry3;

       if (data.vehicle_type == "4" || data.vehicle_type=='44') {
          qry2 = "UPDATE driver SET  status=4 WHERE id = ?";
       }else{
          qry2 = "UPDATE driver SET status=2 WHERE id = ?";
         /* qry3 = "UPDATE ride_request SET  vehicle_type=6    WHERE ride_request_id = ?";
         updateVehicleType(qry3);*/

       }


      con.query(qry2, [data.driver_id], (err, qry2updated) => {
        if (err) {
          reject(err);
        } else {
          resolve(qry2updated);
        }

      })


    })
  }


  promiseDel.then((done) => {
    return promiseUpdate(data);
  }).then((promiseDone) => {
    return promiseTypeUpdate(data.type);
  }).then((result) => {
    if (type == "regular") {
      getCustomerList(data);  // To customer list for driver
      getDriverList(data, customerSocket, type)    // To get driver List for customer
      io.to(customerSocket).emit('confirmRide', data);  // Customer side emit and on function
    }
    if (type == "pool") {
      poolCustomerList(data);
      getDriverList(data, customerSocket, type)// To get driver list for customer ride  
      io.to(customerSocket).emit('PoolConfirmRide', data); // Customer side emit and on function 

    }
    if (data.service_type == "2") {

      getDeliveryItems(data); // To get customer List for ride
      getDriverList(data, customerSocket, type) // To get driver list for customer ride
      io.to(customerSocket).emit('deliveryConfirmRide', data); // Customer side emit and on function      
    }
    
       

  }).catch((err) => {
    console.log("This is error in requestAcceptedByDriver error", err);
    //throw err;
  })

 

}
//Rquest Ride accepted by driver to update data in mysql database is end here.
//blah
//send noti to customer

function send_notification(customer,data,customerSocket,msg)
{
  //console.log("send Notification customerSocket",data)
    //var serverKey = 'AIzaSyCL2MJntG6FXurioeJ-e-gZrDLcoSPqYxU'; //server key here for android(customer)
    var serverKey = 'AAAASCITRVM:APA91bE0TNS8JanRM2HpOTdM6hCJ4qX5MeA5NTLDdSNC4P5c0s0dF9b4_9kMVjm1hpizspSvCRW4Z19HOFNC0lrrhlgDRBPoJV_9Ps2pcWbqYdzm62my7rtB_JHZsrbPPqWHgqtuBW8b'; //server key here for android(customer)
    var fcm = new FCM(serverKey);

  //////console.log("Notification dataaaaaaa===>",data);
  var get_device = new Promise((resolve, reject) => {
    let updateQry = "select device_type,device_token,socket_id from customer where id= ? and device_type !=''";
    con.query(updateQry, [data.customerID], (err, result) => {
      if (err) {
        reject(err);
      } else {
         resolve(result);
        
      }

    })

  })


    get_device.then((result) => {
   // console.log("send_notification=======================>",result['device_type']);
     console.log("send_notification=======================>",result[0]['device_type']);
      if(result[0].device_type=='A' && result[0].device_type!=='')
      {
        
              //////console.log(result[0].device_token);
              //send notification
              var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                  to: result[0].device_token, 
                  collapse_key: 'your_collapse_key',
                  
                 /* notification: {
                      title: data.message, 
                      body: data.message
                  },*/
                  
                  data: data
                 


              };
               //console.log("noti data==============>",message);
              
              fcm.send(message, function(err, response){
                  if (err) {
                      console.log("Something has gone wrong!");
                  } else {
                     console.log("Successfully sent with response android customer: ");
                       //io.to(customerSocket).emit('notification', response);
                  }
              });

             
              
           
      }else if(result[0].device_type=='I' && result[0].device_type!==''){
            //ios device
            let deviceToken = result[0].device_token;
            //////console.log("ios device_token================>",data.noti_type);


           // Prepare the notifications
           let notification = new apn.Notification();
           notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
           notification.badge = 1;
           notification.sound = "ping.aiff";
           notification.alert = message;
           notification.title = "";
           notification.body = data.message;

          notification.payload = {'data': data};
          
          // Replace this with your app bundle ID:
           notification.topic = "com.cabscoutcustomer.apps";

            apnProvider.send(notification, deviceToken, function(err, response){
                  if (err) {
                      ////console.log("Something has gone wrong!",err);
                  } else {
                      ////console.log("Successfully sent with response ios: ", response);
                       //io.to(customerSocket).emit('notification', response);
                  }
              });
           
           
          // Close the server
           apnProvider.shutdown(); 

      }else{
        console.log("device type not found")
      }
     
      
    }).catch((err) => {
      console.log("error in catch using send_notification function Promise", err);
      throw err;
    })

}

//common method to get the socket id 
function getOriginalSocketID(data,emit,res) {
  ////console.log('getOriginalSocketID##############################',data)
  ////console.log('getOriginalSocketID response ##############################',res)
  let customerData = { res };
  let dataCustomer = { customerData };
  if(data.driverSocketId)
  {
     
    client.hgetall(data.driverSocketId, (err, result) => {
          if (!result) {
            //console.log("No socket found to this using common socket id get method");

          } else {
              io.to(result.socket).emit(emit, dataCustomer);
              //return result.socket
              //console.log("socket found to this using common driver socket id get method",dataCustomer);
        
          }

        })
  }else{
    client.hgetall(data.customerSocketId, (err, result) => {
        if (!result) {
          //console.log("No socket found to this using common socket id get method");

        } else {
            io.to(result.socket).emit(emit, dataCustomer);
            //return result.socket
            //console.log("socket found to this using common customer socket id get method",dataCustomer);
      
        }

      })
  }
 
  
  
}

  function insertData(table,data) {
  // console.log("invoiceeeeeeeeeeeeeeeeeeeeeeeeeeee=>",data);
   let is_read=(data.isOppositeOnline==1)?1:0; //if online means on same screen dont increase count
    var get_chat = new Promise((resolve, reject) => {
         let paymentQry = "INSERT INTO ?? (ride_id,message_from,message,created_at,is_read,is_seen,socket_id,deliverySenderSocketId,deliveryReceiverSocketId,isDelivery) VALUES(?,?,?,?,?,?,?,?,?,?)";
                    con.query(paymentQry, [table,data.ride_id, data.message_from, data.message,data.time,is_read,is_read,data.customerSocketId,data.deliverySenderSocketId,data.deliveryReceiverSocketId,data.isDelivery], (err, done) => {
                        if (err) {
                         // reject(err);
                         throw err;

                        } else {
                          resolve(done);
                        }
                    })
     })  

     get_chat.then((result) => {
         fetchChat("c.id='"+result.insertId+"'",data)
         //let socketId=(data.message_from==0)?data.driverSocketId:data.customerSocketId;
         ////console.log("invoiceeeeeeeeeeeeeeeeeeeeeeeeeeee=>",socketId);
         //let socket_id=getOriginalSocketID(data);
      }).catch((err) => {
      console.log("error in catch using send_notification function Promise", err);
     
    })
}


function fetchChat(where,data) {
  

   var fetchchat = new Promise((resolve, reject) => {

    var fetchChat = "SELECT c.*,cus.socket_id as customer_socket_id,cus.id as customer_id,d.socket_id as driver_socket_id,d.id as driver_id  FROM `chat`as c JOIN ride_request as r on r.ride_request_id=c.ride_id join customer as cus on cus.id=r.customer_id join driver as d on d.id=r.driver_id WHERE " + where +" order by c.id asc" ;
   /* var fetchChat = "SELECT c.*,cus.socket_id as customer_socket_id,d.socket_id as driver_socket_id , (SELECT count(c.id) FROM chat as c WHERE c.is_read='0' and message_from ="+data.message_from+") as chat_badges FROM chat as c  LEFT  JOIN ride_request as r ON r.ride_request_id=c.ride_id LEFT JOIN customer as cus on cus.id=r.customer_id LEFT JOIN driver as d on d.id=r.driver_id where " + where +" order by c.id asc" ;*/
   // //console.log("where conditonnnnnn",fetchChat);
    con.query(fetchChat, (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })
   

     fetchchat.then((result) => {
     // console.log("emittttt dataaa tooooo",data)
      // console.log("fetchchat resultttt",result);

       var other_data = [];

         if (typeof (data.senderName) !== "undefined" && result.length!=0) {
          
              result.forEach(myFunction);

                function myFunction(item, index) 
                {
                  
                 other_data.push({'id': item.id,
                              'message_from': item.message_from,
                              'message':item.message,
                              'ride_id':item.ride_id,
                              'created_at':item.created_at,
                              'is_seen':item.is_seen,
                              'socket_id':item.socket_id,
                              'deliverySenderSocketId':item.deliverySenderSocketId,
                              'deliveryReceiverSocketId':item.deliveryReceiverSocketId,
                              'isDelivery':item.isDelivery,
                              'customer_socket_id':item.customer_socket_id,
                              'customer_id':item.customer_id,
                              'driver_socket_id':item.driver_socket_id,
                              'driver_id':item.driver_id,
                              'senderName':data.senderName,
                              'receiverName':data.receiverName,
                              'driverName':data.driverName,
                              'riderName':data.riderName,
                            });

             
             }//end myFunction

         }else if(typeof (data.senderName) == "undefined" && result.length!=0){
           result.forEach(myFunction);

                function myFunction(item, index) 
                {
                  other_data.push({'id': item.id,
                              'message_from': item.message_from,
                              'message':item.message,
                              'ride_id':item.ride_id,
                              'created_at':item.created_at,
                              'is_seen':item.is_seen,
                              'socket_id':item.socket_id,
                              'deliverySenderSocketId':item.deliverySenderSocketId,
                              'deliveryReceiverSocketId':item.deliveryReceiverSocketId,
                              'isDelivery':item.isDelivery,
                              'customer_socket_id':item.customer_socket_id,
                              'customer_id':item.customer_id,
                              'driver_socket_id':item.driver_socket_id,
                              'driver_id':item.driver_id,
                              });
                 }//end myFunction
         }
       
         
       /* is_single = "1"
        mein bhejta jb mein all chat fetch krne ko bolta apko 

        is_single = "0"tb bhejta jb mein single single message krta hoon*/
        
       // console.log("fetchchat resultttt after append",other_data);

      if(data.deliverySenderSocketId && data.deliveryReceiverSocketId && data.message_from=='1' && data.is_single==0 && data.isDelivery==1){
      //  console.log("emit to driver only");
        //sendDataObjResCustomer(result,data.customerSocketId,'chat');
        sendDataObjResCustomer(other_data,data.deliverySenderSocketId,'chat');
        sendDataObjResCustomer(other_data,data.deliveryReceiverSocketId,'chat');
        sendDataObjResCustomer(other_data,data.driverSocketId,'chat');
       
       
      }else if (data.deliverySenderSocketId && data.deliveryReceiverSocketId && data.message_from=='0' && data.is_single==0){
           //console.log("emit to customer only");
           sendDataObjResDriver(other_data,data.driverSocketId,'chat');
           sendDataObjResCustomer(other_data,data.deliverySenderSocketId,'chat');
           sendDataObjResCustomer(other_data,data.deliveryReceiverSocketId,'chat');
           
        
      }else if(data.customerSocketId && data.message_from=='1' && data.is_single=='1')
      {
         //console.log("emit to customer only");
        sendDataObjResCustomer(other_data,data.customerSocketId,'chat');
        
      }else if(data.driverSocketId && data.message_from=='0' && data.is_single=='1'){
        // console.log("emit to customer only");
         sendDataObjResCustomer(other_data,data.driverSocketId,'chat');

         
      }else if(data.deliverySenderSocketId && data.deliveryReceiverSocketId && data.message_from=='1' && data.is_single==0 && data.isDelivery==0){
        // console.log("emit to customer only");
        sendDataObjResCustomer(other_data,data.driverSocketId,'chat');
        sendDataObjResCustomer(other_data,data.customerSocketId,'chat');
        sendDataObjResCustomer(other_data,data.deliverySenderSocketId,'chat');
        sendDataObjResCustomer(other_data,data.deliveryReceiverSocketId,'chat');
      }

     /* if(data.message_from==1)  
      {
        //customer is sending msg notify to driver
        send_notification_driver(data);
        
        sendDataObjResCustomer(result,data.deliverySenderSocketId,'chat');
        sendDataObjResCustomer(result,data.deliveryReceiverSocketId,'chat');
        sendDataObjResDriver(result,data.driverSocketId,'chat');

      }else if(data.customerSocketId && data.message_from==1 ){
         //console.log("emit to customer  and reciver also when driver send msg");
        sendDataObjResCustomer(result,data.customerSocketId,'chat');
        sendDataObjResCustomer(result,data.receiverSocketId,'chat');
        sendDataObjResCustomer(result,data.receiverSenderSocketId,'chat');

      }else{
        //driver is sending msg notify to customer
        send_notification('',data,data.customerSocketId,data.message);

        sendDataObjResCustomer(result,data.deliverySenderSocketId,'chat');
        sendDataObjResCustomer(result,data.deliveryReceiverSocketId,'chat');
        sendDataObjResDriver(result,data.driverSocketId,'chat');
      }*/


    }).catch((err) => {
      console.log("Error........", err);
     
    })
  
}




function sendDataObjResDriver(result,socketID,emitD) {
// //console.log("socket id isss ", socketID);
    client.hgetall(socketID, (err, driverSocket) => {
      if (!driverSocket) {
        //console.log("No driver socket id found to this ", err);
      } else {
        
          let customerData;
         customerData = { result };
         let dataCustomer = { customerData };
        console.log("sendDataObjResDriver.socket------------>",socketID,emitD);
        io.to(driverSocket.socket).emit(emitD, dataCustomer);


      }
    })
  
}

function sendDataObjResCustomer(result,socketID,emitD) {
    //console.log("customer socket id isss ", result);
    client.hgetall(socketID, (err, cusSocket) => {
      if (!cusSocket) {
        console.log("No cusSocket socket id found to this ", err);
      } else {
        
        let customerData;
        customerData = { result };
        let dataCustomer = { customerData };
        console.log("usSocket.socket----------->",socketID,emitD);
        io.to(cusSocket.socket).emit(emitD, dataCustomer);

      }
    })
  
}




// Driver Arrived to customer api to update data to mysql database
function driverArrived(customers,data, customerSocket, type) {
console.log("driver arrived method============>",customerSocket);
  var updatePromise = new Promise((resolve, reject) => {
    let updateQry = "UPDATE ride_request SET customer_status=2 WHERE driver_id= ? AND ride_request_id= ? AND customer_id= ?";
    con.query(updateQry, [data.driver_id, data.ride_request_id, data.customerID], (err, updated) => {
      if (err) {
        reject(err);
      } else {
        resolve(updated);
      }

    })

  })

  updatePromise.then((done) => {
    send_notification(customers,data,customerSocket,'Driver Arrived');
    if (type == "regular") {
      io.to(customerSocket).emit('add_message', data); // Customer emit and on function
      getCustomerList(data);

    }
    if (type == "pool") {
      io.to(customerSocket).emit('driverTracking', data); // Customer emit and on function
      poolCustomerList(data);
    }
    if (type == "delivery") {
      ////console.log("*********************trackingDatadilivery***********",customerSocket);
               io.to(customerSocket).emit('trackingDelivery', data); // Customer emit and on function
                getDeliveryItems(data);
     
    }

  }).catch((err) => {
    console.log("Error from updatePromise ......", err);
    throw err;
  })


}

function send_otp(result) {
  ////console.log("send_otppppppp",result);
         var otp=Math.floor(1000 + Math.random() * 9000);
          var name = result[0].deliver_to;
          var customer_name = result[0].customer_name;
          var product_name = result[0].product_name;
          var link = 'https://urlzs.com/PkQch';
          var link2 = 'https://urlzs.com/2P9fC';

         var message = "Hello "+name+", "+customer_name+" has just sent you a package  "+product_name+" with OTP "+otp+" using the Traala App. You can track the package with order-id "+result[0].deliver_id+" through the app. Download Android App link "+link+" Download Iphone App link "+link2;

          //put the comma separated mobile number;
          var mobileNumber= result[0].mobile;

          //put the email id;
          var email=result[0].email;
         

         sendsmsGET(mobileNumber,message);


          //update otp in request_driver

           var promiseDel = new Promise((resolve, reject) => {
            let updateQry = "UPDATE delivery_data SET otp=?  WHERE deliver_id=?";
            con.query(updateQry, [otp,result[0].deliver_id], (err, updated) => {
              if (err) {
                reject(err);
              } else {
                resolve(updated);
              }
            })
          })
     
         
}

// Driver arrived to customer api update ends here


//Driver trip started updation in mysql database 
//change status from 6 to 3(progess)
function sms(data) {
  ////console.log('smsssssssssss==>',data);
     var get_device = new Promise((resolve, reject) => {
         let updateQry = "select dd.deliver_id, s_loc.mobile,s_loc.name as deliver_to,sp.product_name, c.name as customer_name,c.email from delivery_data as dd ,saved_delivery_locations s_loc,customer as c, saved_product_info  sp where dd.customer_id=c.id and dd.destination_id=s_loc.id and dd.product_id=sp.id and deliver_id=?";
         con.query(updateQry, [data.delivery_id], (err, result) => {
          if (err) {
            reject(err);
          } else {
             resolve(result);
           }
        })
     })  

     get_device.then((result) => {
           send_otp(result);
      }).catch((err) => {
      console.log("error in catch using send_notification function Promise", err);
      throw err;
    })
  
 
}

function get_online_drivers(where_cond,data,radius) {
//  console.log("get_online_drivers");
/*Select id,name,vehicle_id,device_type,device_token,car_type,status,socket_id,latitude,longitude, 3959 * acos(if(d>1, 1, if(d<-1, -1, d))) as distance From (SELECT id,name,vehicle_id,device_type,device_token,car_type,status,socket_id,latitude,longitude, cos( radians("30.7363417") ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians("76.71802") ) + sin( radians("30.7363417") ) * sin(radians(latitude))  AS d FROM driver WHERE verified_status=1 AND (status=4 or status=1) && FIND_IN_SET("",car_type) and vehicle_id='' and seat_pool_avail=0  and company_verify=1 ) t1 HAVING distance < 10 ORDER BY distance*/
   var get_device = new Promise((resolve, reject) => {
          /* let updateQry = "select id,name,device_type,device_token,car_type,vehicle_id,status,socket_id,latitude,longitude,(((acos(sin((" + data.latitude + "*pi()/180))  * sin((`latitude`*pi()/180))+cos((" + data.latitude +"*pi()/180)) * cos((`latitude`*pi()/180))  * cos(((" +data.longitude + "- `longitude`)*pi()/180))))*180/pi())*60*1.1515)   as distance from driver WHERE "+where_cond+" ORDER BY distance";
*/
           let updateQry="Select id,name,vehicle_id,device_type,device_token,car_type,status,socket_id,latitude,longitude, 3959 * acos(if(d>1, 1, if(d<-1, -1, d))) as distance From (SELECT id,name,vehicle_id,device_type,device_token,car_type,status,socket_id,latitude,longitude, cos( radians("+data.latitude +") ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians("+data.longitude +") ) + sin( radians("+data.latitude +") ) * sin(radians(latitude))  AS d FROM driver WHERE "+where_cond+" ) t1 HAVING distance < "+radius+" ORDER BY distance";
           con.query(updateQry, (err, result) => {
            if (err) {
              throw (err);
            } else {

              if(result!=='')
              {
               //console.log("driver foundddddddddddd",result);
                // resolve(result);
                 //io.to(data.customerSocketId).emit('get_online_drivers', result);
                 client.hgetall(data.customerSocketId, (err, customerResult) => {
              if (!customerResult) {
                console.log("No socket found to this customerSocketId firstFunction");
              } else {
                let driverData;
                           driverData = { result };
                          let dataDriver = { driverData };
                         // console.log("emit data to online driverrrrrr",dataDriver);
                io.to(customerResult.socket).emit('get_online_drivers', dataDriver);  // Driver side emit and on 

              }

          })

              }else{
                    console.log("No driver Found");

              }
              
              
              
             }
          })


       })  
}
function tripStarted(customers,data, customerSocket, type) {

  //////console.log("typeeeeeeeeeeeeee",type);
  //console.log("tripStarted dataaaaa",customers);
  var tripUpdate = new Promise((resolve, reject) => {

    let updateQry = "UPDATE request_driver SET start_date=?,start_time=?,pickup_cordinates=?,status=3 WHERE id=?";
    con.query(updateQry, [data.start_date, data.start_time, data.pickup_cordinates, data.ride_request_id], (err, done) => {
      if (err) {
        reject(err);
      } else {
        resolve(done);
      }
    })

  })



  function updateTrip(data) {
    return new Promise((resolve, reject) => {
      let updateQry = "UPDATE ride_request SET customer_status=3 WHERE driver_id=? AND ride_request_id=? AND customer_id=?";
      con.query(updateQry, [data.driver_id, data.ride_request_id, data.customerID], (err, done) => {
        if (err) {
          reject(err);
        } else {
          resolve(done);
        }
      })
    })
  }

  tripUpdate.then((result) => {
    return updateTrip(data);
  }).then((done) => {
    send_notification(customers,data,customerSocket,'Your trip has begun');
    if (type == "regular") {
      io.to(customerSocket).emit('add_message', data);
      getCustomerList(data);
    }
    if (type == "pool") {
      io.to(customerSocket).emit('driverTracking', data);
      poolCustomerList(data);
    }

    if (type == "delivery") {
               io.to(customerSocket).emit('trackingDelivery', data); // Customer emit and on function
                getDeliveryItems(data);
    }
  }).catch((err) => {
    console.log("error in catch using tripUpdate function Promise", err);
    throw err;
  })


}
//Driver trip started updation end here



//Trip completed by driver

function tripCompleted(customers,data,customerSocket, type) {
  console.log('trip_completed dataaaaaaaaa',data);
  var promiseUpdate = new Promise((resolve, reject) => {
    let updateQry = "UPDATE request_driver SET end_date=?,end_time=?,drop_cordinates=?,status=1 WHERE id=?";
    con.query(updateQry, [data.end_date, data.end_time, data.drop_cordinates, data.ride_request_id], (err, done) => {
      if (err) {
        reject(err);
      } else {
        resolve(done);
      }
    })

  })


  function updateCustomer(data) {

    return new Promise((resolve, reject) => {
      let Query = "UPDATE ride_request SET customer_status= 4,status=4  WHERE ride_request_id=? AND driver_id = ? AND customer_id=?";
      con.query(Query, [data.ride_request_id, data.driver_id, data.customerID], (err, result) => {
        if (err) {
          reject(err);

        } else {
          resolve(result);
        }
      })
    })
  }

   function clearChat(data) {

    return new Promise((resolve, reject) => {
      let Query = "delete  from chat  WHERE ride_id=? ";
      con.query(Query, [data.ride_request_id], (err, result) => {
        if (err) {
          reject(err);

        } else {
          resolve(result);
        }
      })
    })
  }
                  

//ride count if customer/driver first ride then we check ref apply or not
  function GetRideCount(data) {
  
    return new Promise((resolve, reject) => {
      let Query = "Select count(id) as ride_countc,(select count(id) from ride_request where driver_id=?)as ride_countd from ride_request where customer_id=?";
      con.query(Query, [data.driver_id,data.customerID], (err, result) => {
        if (err) {
          reject(err);

        } else {
          resolve(result);
        }
      })
    })
  }

  promiseUpdate.then((result) => {
    return updateCustomer(data);
  }).then((Done) => {
    return clearChat(data);
  }).then((promiseDone) => {
    return GetRideCount(data);
  }).then((result)=>{
  //  //console.log('ride count ******',result)
    if (result[0].ride_countc==1) {
      return checkRef(data.customerID,'c');
    }
    if (result[0].ride_countd==1) {
      return checkRef(data.driver_id,'d');
    }     
    
  }).then((done) => {
    send_notification(customers,data,customerSocket,'Trip completed');
    //send_invoice_customer(data,customerSocket,'Trip completed');
    if (type == "regular") {
      io.to(customerSocket).emit('add_message', data);
      getCustomerList(data);
    }
    if (type == "pool") {
      poolCustomerList(data);
      io.to(customerSocket).emit('driverTracking', data);
    }

    if (type == "delivery") {    
         io.to(customerSocket).emit('trackingDelivery', data); // Customer emit and on function
         getDeliveryItems(data);
    }
  }).catch((err) => {
       //console.log(`Error in promises ${err}`)
    console.log("Error from promiseUpdate or updateCustomer", err);
    //throw err;
  })


}

//Trip compeleted ends here


function requestRejectedByDriver(data, customerSocket, type) {
// ////console.log("requestRejectedByDriver deliver_dataaaaaaaaaaaaaaaaaaa",type);
  let sqlQry = "UPDATE ride_request SET status=2  WHERE ride_request_id=? AND driver_id=?";

  con.query(sqlQry, [data.ride_request_id, data.driver_id       ], (err, done) => {

    if (err) {
      ////console.log("No data updated in ride_request table using requestRejectedByDriver", err);
    } else {
      if (type == "regular") {
        io.to(customerSocket).emit('RideRejected', data); //customer side 
      }
      if (type == "pool") {
        io.to(customerSocket).emit('PoolRideRejected', data); //customer side
      }

      if (type == "delivery") {
        io.to(customerSocket).emit('deliveryRideRejected', data);  //customer side
      }
    }
  })

}
/* Ride rejected by driver after acceptence of customer rider */

function rideCancelDriver(data, customerSocket) {
console.log("ride cancel by driverrrrr=>",data);
  let sqlQry = "UPDATE ride_request SET status=2,reason_for_cancel=?  WHERE ride_request_id=? AND driver_id=?";
  con.query(sqlQry, [data.cancel_id,data.ride_request_id, data.driver_id], (err, done) => {
    if (err) {
      ////console.log("No data updated using rideRejectedByDriver function", err);
    } else {
      send_notification(data,customerSocket,'Driver cancel your ride');
      //send_sms(data.customerID,data.message,'customer');
      if (data.type == "regular") {
        getCustomercharges(data,'regular');
        io.to(customerSocket).emit('cancelRideByDriver', data);
      }
      if (data.type == "pool") {
        getCustomercharges(data,'pool');
        poolCustomerList(data);
        io.to(customerSocket).emit('cancelRideByDriver', data);
      }
      if (data.type == "delivery") {       
        getCustomercharges(data,'delivery');
        getDeliveryItems(data);
        io.to(customerSocket).emit('cancelRideByDriver', data);

        //emit the receiver also about driver canclation
        client.hgetall(data.receiverSocketId, (err, socketCustomer) => {
          if (!socketCustomer) {
            //console.log("No socket found to this customer socket id in requestCancelByDriver function");

          } else {
                io.to(socketCustomer.socket).emit('cancelRideByDriver', data);
          }

        })
       
      }



    }
  })

}

function send_sms(customerID,message,table)
{
  
  var get_device = new Promise((resolve, reject) => {
    let updateQry = "select name,mobile from ?? where id= ?";
    con.query(updateQry, [table,customerID], (err, result) => {
      if (err) {
        reject(err);
      } else {
         resolve(result);
         //////console.log("snedddddddddddddddddddddddddddddddddddd smsssssssss",result);
        
      }

    })

  })


    get_device.then((result) => {
      ////console.log(result);
      var messages = "Hello "+result[0].name+' '+message;
      sendsmsGET(result[0].mobile,messages);
      
    }).catch((err) => {
      console.log("error in catch using send_notification function Promise", err);
      throw err;
    })

}

/* Ride  rejected if no socket id  found to this driver */

function rideRejectedByDriver(data, customerId) {
 //////console.log("reject ride from driver======>",data);
  client.hgetall(customerId, (err, customerResult) => {
    /*If driver socket is not found in database then this method will alert the customer to move for next driver */
    if (!customerResult) {
      ////console.log("No socket found to this customerSocketId firstFunction");

    } else {
      io.to(customerResult.socket).emit('RideRejected', data);  // Driver side emit and on 

    }

  })

}

//Accept payment from  customer to driver 

// Updating total rides of customer in customer table
function countPaymentByUsers(data) {

  let countQry = "SELECT COUNT(*) AS countNumbers FROM payment_by_customer WHERE  customer_id =? AND payment_status = 1";
  con.query(countQry, [data.customerID], (err, counts) => {
    if (err) {
      ////console.log("No count of payment found to this user from using funciton in payment_by_customer");
    } else {
      let updateQry = "UPDATE customer SET total_rides=? WHERE id=?";
      con.query(updateQry, [counts[0].countNumbers, data.customerID], (err, done) => {
        if (err) {
          ////console.log("No data is updated in customer table");
        } else {
          ////console.log("Data is updeted using function countPaymentByUsers ");
        }
      })
    }
  })

}


// Updateding total rides of drivers in driver table

function countPaymentByDrivers(data) {
  let countQry = "SELECT COUNT(*) AS countNumbers FROM payment_by_customer WHERE  driver_id =? AND payment_status = 1";
  con.query(countQry, [data.driver_id], (err, counts) => {
    if (err) {
      ////console.log("No count of payment found to this user from using funciton in payment_by_customer");
    } else {
      let updateQry = "UPDATE driver SET total_rides=? WHERE id=?";
      con.query(updateQry, [counts[0].countNumbers, data.driver_id], (err, done) => {
        if (err) {
          ////console.log("No data is updated in driver table");
        } else {
          ////console.log("Data is updeted using function countPaymentByDrivers drivers");

        }
      })
    }
  })

}

//check ref
function checkRef(data,type) {
 console.log("check refff dataaaaaaaa",type);
  let table=(type=='c')?'customer':'driver';
  
  var get_device = new Promise((resolve, reject) => {
    let updateQry = "SELECT sender_id ,type FROM `referral` WHERE receiver_id = ? and type=?";
    con.query(updateQry, [data,type], (err, driverStatus) => {
      if (err) {
        reject(err);
      } else {
        resolve(driverStatus);
      }

    })

  })

  function insertPromo(data) {
    console.log(`insert promo00000 ${data}`);
    
    return new Promise((resolve, reject) => {
      let Query = "INSERT INTO cus_promo(cus_id,promo_id,type) VALUES(?,?,?)";
      con.query(Query, [data[0].sender_id,'6',data[0].type], (err, result) => {
        if (err) {
          reject(err);

        } else {
           //resolve(result);
            //give reward to sender
            let table=(data[0].type=='c')?'customer':'driver';
              let statusQry = "UPDATE ?? SET promo_id = ? WHERE id = ?";
              con.query(statusQry, [table,"6",data[0].sender_id], (err, statusUpdated) => {
                if (err) {
                  reject(err);
                  console.log("No data updated in referral table", err);
                } else {
                  //resolve(statusUpdated);
                  console.log("customer promo id updated");
                }
              })
        }
      })
    })
  }

   get_device.then((result) => {
           console.log('getting ref code**********',result);
           if (result.length!=0) {
            return insertPromo(result);
           }
           
      }).catch((err) => {
      console.log("error in getting invioce Promise", err);
    })



}



function get_customer_wallet(data) {
 console.log("customer_wallet dataaaaaa",data)
  var updatePromise = new Promise((resolve, reject) => {
   let countQry = "SELECT  customer_wallet from customer WHERE id=?";
  con.query(countQry, [data.customerID], (err, counts) => {
        if (err) {
          //console.log("no amount in customer wallet",err);
        } else {
                 //  //console.log("customer wallet deliver_dataaaaaaaaaaaaaaaaaaaa",counts);
                  //check if customer has valid amount in wallet
                  if(counts[0].customer_wallet > 40)
                  {
                     var amount_wallet=counts[0].customer_wallet-data.amount;
                     var remain_blanc= Number(amount_wallet).toFixed(2);
                   // //console.log("customer wallet deliver_dataaaaaaaaaaaaaaaaaaaa",amount_wallet);
                      let statusQry = "UPDATE customer SET customer_wallet = ? WHERE id = ?";
                      con.query(statusQry, [remain_blanc, data.customerID], (err, statusUpdated) => {
                        if (err) {
                          //console.log("No data updated in customer wallet", err);
                        } else {
                            ////console.log("Customer wallet is updated in customer table");
                            let statusQry2 = "UPDATE payment_by_customer SET payment_status = ? WHERE ride_id = ?";
                              con.query(statusQry2, ['1', data.ride_id], (err, statusUpdated) => {
                                if (err) {
                                  //console.log("No data updated in payment_by_customer wallet", err);
                                } else {
                                  //update in ride_request table
                                  //console.log("Customer wallet is updated in payment_by_customer table");

                                   let datetime=Math.floor(Date.now() / 1000);
                                   //add record of customer wallet
                                    let statusQry2 = "INSERT INTO customer_wallet_records(customer_id,customer_wallet,ride_id,amount,type,datetime) VALUES(?,?,?,?,?,?)";
                                    con.query(statusQry2, [data.customerID,counts[0].customer_wallet, data.ride_id,data.amount,'1', datetime], (err, statusUpdated) => {
                                      if (err) {
                                        //console.log("No data updated in payment_by_customer wallet", err);
                                      } else {
                                        //update in ride_request table
                                        //console.log("Customer wallet is updated in payment_by_customer table");
                                        if(data.customerSocketId)
                                        {
                                          sendDataObjResCustomer(data,data.customerSocketId,'get_customer_wallet');
                                        }
                                      }
                                    })
                                  
                                }
                              })



                        }
                      })

                  }else{
                    //console.log("not enough amount in wallet");
                  }
              
          
              }
      })

  })

   

}

/* After collecting paymant from customer data inserted in payment_by_customer */
//impor
function paymantDoneDriver(data,type) {
  //console.log("payment of customer===========>",data);
  var paymentByCustomer = new Promise((resolve, reject) => {

  let updateRideqry ="select ride_id from payment_by_customer where ride_id= ?";
  con.query(updateRideqry, [data.ride_id], (err, detail) => {
     if (err) {
          reject(err);
        } else {
           if(detail == '')
          {
             let paymentQry = "INSERT IGNORE INTO payment_by_customer(driver_id,customer_id,ride_id,amount,payment_status,payment_method,created,currency,non_tax_amount,tax,traala_commision,payment_process,tax_p,tc_per,p_process_per,pay_to_driver,promo_amount,return_amount,retry_amount,CheckoutRequestID,time_fare,distance_fare,basefare) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
              con.query(paymentQry, [data.driver_id, data.customerID, data.ride_id, data.amount, data.payment_status,data.paymentType, data.datetime, data.currency, data.non_tax_amount, data.tax,data.traala_commision,data.payment_process,data.tax_per,data.traala_commision_per,data.payment_process_per,data.pay_to_driver,data.promo_amount,data.return_amount,data.retry_amount,data.checkoutRequestId,data.time_fare,data.distance_fare,data.basefare], (err, done) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(done);
                }
              })

          }else{
            
              let paymentQry = "UPDATE payment_by_customer SET driver_id=?,customer_id=?,amount=?,payment_status=?,payment_method=?,created=?,currency=?,tax=?,traala_commision=? ,payment_process=?,tc_per=?,p_process_per=?,pay_to_driver=?,promo_amount=?,return_amount=?,retry_amount=?,CheckoutRequestID=? ,time_fare=?,distance_fare=?,basefare=? WHERE  ride_id = ?";
                    con.query(paymentQry, [data.driver_id, data.customerID, data.amount, data.payment_status,data.paymentType, data.datetime, data.currency, data.non_tax_amount, data.tax,data.traala_commision,data.payment_process,data.tax_per,data.traala_commision_per,data.payment_process_per,data.pay_to_driver,data.promo_amount,data.return_amount,data.retry_amount,data.checkoutRequestId,data.time_fare,data.distance_fare,data.basefare,data.ride_id], (err, done) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(done);
                      }
                    })

           
           }//end else
        }//end outer else

  })

   

  })

  function updateRideRequest(dataUpdate) {  

    //console.log("update ride request of cancel ride Data==========>",dataUpdate);
    return new Promise((resolve, reject) => {

      let updateRideqry = "UPDATE ride_request SET status=5,customer_status= 0 WHERE ride_request_id=? AND driver_id = ? AND customer_id=?";
      con.query(updateRideqry, [dataUpdate.ride_id, dataUpdate.driver_id, dataUpdate.customerID], (err, detail) => {
        if (err) {
          reject(err);
        } else {
          //resolve(detail);
          if(detail)
          {
            //update ditance and time in request driver table
             let paymentQry =  "UPDATE request_driver SET distance=?,ride_complete_time=? WHERE id=? AND customer_id=?";
                    con.query(paymentQry, [dataUpdate.distance, dataUpdate.time,dataUpdate.ride_id, dataUpdate.customerID], (err, done) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(done);
                      }
                    })

          }
        }
      })
    })
  }

  function updateDriverPayout(payout) {  
    //console.log("dfgdgdfffffffffffffffffff>",payout);
    return new Promise((resolve, reject) => {
    
      let updateRideqry ="select * from driver_payout where driver_id= ?";;
      con.query(updateRideqry, [payout.driver_id], (err, detail) => {
        if (err) {
          reject(err);
        } else {
          ////console.log('dataaaaaa',detail);
          //resolve(detail);
         
          if(detail == '')
          {
           
            //insert payout
            //////console.log("payout promo id is",payout.promoId);

             var driver_payout= payout.pay_to_driver;

           /* if(payout.promoId !== '0')
            {
              var promo_amount=payout.promo_amount;//deduct promo amount from driver payout
              var final_payout= +oldpayout+ +promo_amount;
              var final_payoutt= final_payout.toFixed(2);
               ////console.log("after deduct promo insert",final_payoutt);
            }else{
              
              var final_payoutt2= -Math.abs(oldpayout);
              var final_payoutt= (payout.paymentType=='0')?final_payoutt2:oldpayout;
               ////console.log("amount without promo insert",final_payoutt);
            }*/
            
            
            var driverFeedBackPromise = new Promise((resolve, reject) => {
              let feedBackQry = "INSERT INTO driver_payout(driver_id,payout) VALUES(?,?)";
              con.query(feedBackQry, [payout.driver_id, driver_payout], (err, result) => {
                if (err) {
                 
                  reject(err);
                } else {
                  
                  resolve(result);
                }
              })

            })


          }else{

                 //update payout
                 var oldpayout=detail[0].payout;
                 var new_payout= +oldpayout+ +payout.pay_to_driver;
                 ////console.log("update driver payout",new_payout);
                /* if(payout.paymentType=='3')
                 {
                  //non-cash payment
                   var new_payout= +oldpayout+ +payout.pay_to_driver;
                   ////console.log("non-cash payment");
                 }else{
                   var new_payout= oldpayout-payout.pay_to_driver;
                   ////console.log("cash payment");
                 }*/
                
                // var new_payoutt=new_payout.toFixed(2);
                 //////console.log("payout promo id is",payout.promoId);
                /*if(payout.promoId !== '0')
                {
                  var new_payoutt= +new_payout+ +payout.promo_amount;//deduct promo amount from driver payout
                  var final_payoutt= new_payoutt.toFixed(2);
                  //////console.log("after deduct promo update",final_payoutt);
                }else{
                  var final_payoutt= new_payout.toFixed(2);
                  ////console.log("amount without promo update",final_payoutt);
                }*/
               
                let updateRideqry = "UPDATE driver_payout SET payout=? WHERE  driver_id = ?";
                  con.query(updateRideqry, [new_payout, detail[0].driver_id], (err, detail) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(detail);
                    }
                  })

          }

        
        }
      })
   


    })//end promise

  }


 

  function send_invoice_customer(data) {
   ////console.log("invoiceeeeeeeeeeeeeeeeeeeeeeeeeeee=>",data);
   var get_device = new Promise((resolve, reject) => {
         let updateQry = "select c.email as customer_email,c.name as customer_name,pc.*,d.name as driver_name,d.profile_pic as driver_image,rq.pickup_location,rq.drop_location,rq.start_date,rq.end_date,rq.start_time,rq.end_time,rq.distance,rq.vehicle_type,rd.status as ride_status from ride_request as rd join request_driver as rq on rq.id=rd.ride_request_id  join customer as c on c.id=rd.customer_id join payment_by_customer as pc on pc.ride_id=rd.ride_request_id join driver as  d on d.id=rd.driver_id  where rd.ride_request_id = ?";
         con.query(updateQry, [data.ride_id], (err, result) => {
          if (err) {
            reject(err);
          } else {
             resolve(result);
           }
        })
     })  

     get_device.then((result) => {
          // sendMail(result,result[0].customer_email);
      }).catch((err) => {
      console.log("error in getting invioce Promise", err);
     // throw err;
    })

}

/*function updatePaymentsts(data) {
   let statusQry2 = "UPDATE payment_by_customer SET payment_status = ? WHERE ride_id = ?";
                              con.query(statusQry2, ['1', data.ride_id], (err, statusUpdated) => {
                                if (err) {
                                  //console.log("No data updated in payment_by_customer wallet", err);
                                } else {
                                  //update in ride_request table
                                  //console.log("Customer wallet is updated in payment_by_customer table");
                                  
                                }
                              })
}*/

  paymentByCustomer.then((result) => {
    return updateRideRequest(data);
  }).then((done) => {
    updateDriverPayout(data);
  }).then((don)=>{
    send_invoice_customer(data);
    if (type == "regular") {
      getCustomerList(data);
      countPaymentByUsers(data);
      countPaymentByDrivers(data);
    }
    if (type == "pool") {
      poolCustomerList(data);
      countPaymentByUsers(data);
      countPaymentByDrivers(data);
    }

    if (data.vehicle_type == "43" || data.vehicle_type == "44" || type == "delivery") {
      getDeliveryItems(data);
      countPaymentByUsers(data);
      countPaymentByDrivers(data);
    }
  }).catch((err) => {
    console.log("Error....", err);
    throw err;
  })


}





// Get delivery order list for driver

function getDeliveryOrder(data, driverSocket) {
  console.log("getDeliveryOrder list dataaaaaaaa",driverSocket);
  var getDeliveryDetail = new Promise((resolve, reject) => {
   var poolRideRequest= "SELECT s_product.product_name FROM delivery_data as dd,saved_product_info as s_product WHERE   dd.product_id=s_product.id and dd.deliver_id =?"
   /* var poolRideRequest = "SELECT dw.range as weight_range,dw.price as weight_price,s_product.product_name FROM delivery_data as dd, delivery_items_weight as dw,saved_product_info as s_product WHERE  dd.product_weight_id=dw.id and dd.product_id=s_product.id and dd.deliver_id =?";*/
    /*var poolRideRequest = "SELECT s_loc.*,s_product.*,pw.*,s.location as desti_location,s.full_address as desti_full_address,s.lat as desti_lat,s.lng as desti_log FROM saved_delivery_locations as s_loc JOIN delivery_data as dd ON dd.pickup_id=s_loc.id  JOIN saved_delivery_locations as s ON s.id=dd.destination_id  join saved_product_info as s_product on dd.product_id=s_product.id join delivery_items_weight as pw on dd.product_weight_id=pw.id  where dd.deliver_id= ?";*/

    con.query(poolRideRequest, [data.delivery_id], (err, detail) => {
      if (err) {
        reject(err);
      } else {
       ////console.log('getDeliveryOrder deliver_dataaaaaaaaaaaaaaaaaaa=>',detail);
        productDetail = {
          driverSocketId: data.driverSocketId,
          order_type: data.order_type,
          vehicle_type: data.vehicle_type,
          CustomerImg: data.CustomerImg,
          CustomerName: data.CustomerName,
          Destination: data.Destination,
          Source: data.Source,
          customerSocketId: data.customerSocketId,
          ride_request_id: data.ride_request_id,
          message: data.message,
          noti_type: data.noti_type,
          ride_type: data.ride_type,
          delivery_id: data.delivery_id,
          customerID: data.customerID,
          ride_price: data.ride_price,
          driver_index: data.driver_index,
          distance: data.distance,
          product_name: data.product_name,
          service_type: data.service_type,
          category_id: data.category_id,
          service_name: data.service_name,
          category_name: data.category_name,
          customer_rating: data.customer_rating,
          product_type: data.product_type,
          waitingTime: data.waitingTime,
         // product_weight_range: detail[0].weight_range

        }
        resolve(productDetail);
      }
    });
  })

  getDeliveryDetail.then((result) => {
    //console.log("requestDeliveryOrder deliver_dataaaaaaaaaaaaaaaaaaaa",result);
    console.log("requestDeliveryOrder2222222 deliver_dataaaaaaaaaaaaaaaaaaaa",driverSocket);
    io.to(driverSocket).emit('requestDeliveryOrder', result);
    
    //let busy = "1";
    //updateDriverStatusRedis(data.driverSocketId, driverSocket, busy);
  }).catch((err) => {
    console.log("Error.....", err);
    throw err;
  })

}


/* Use transport websocket to make connection more realiable between socket and customer,driver */
io.set('transports', ['websocket',
    'flashsocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling',
    'polling']);

/*End of tranport websocket */

/*
io.use(function(socket, next){
  //console.log("socket.handshake query",socket.handshake.query)
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, 'example_key', function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
    //  console.log("decodeddd",decoded);
      next();
    });
  }
  else {
   // console.log("socket.Authentication error",next)
    next(new Error('Authentication error'));
    
  }    
})*/

//hye

/* Here start socket connection for users(customer and driver)  */
io.on('connection', (socket) => {
console.log('Socket succesfully connected with id: '+ socket.id);
  socket.removeAllListeners()

 /* To get current status of customer and emit to driver List */

 socket.on('currentCustomerStatus',(data)=>{
   client.hgetall(data.customerSocketId,(err,customerSocket)=>{
      if(!customerSocket){
        ////console.log("No socket found to this customer id");
      }else{
        getDriverList(data,customerSocket.socket,data.type);
      }
   })


})

 socket.on('get_customer_wallet',(data)=>{
    get_customer_wallet(data);

})

  socket.on('authenticated', (socket) => {
    //this socket is authenticated, we are good to handle more events from it.
    console.log(`hello! ${socket.token}`);
  });

//here we update the seen status of customer or driver when thay are on diffrent screen
  socket.on('seenChatMsg',(data)=>{
    //msg_from= 1 then its customer read all the driver msg
    let msg_from=(data.message_from==1)?0:1;

    //then read driver's messgae
    let paymentQry = "UPDATE chat SET is_seen=? WHERE  ride_id = ? and message_from=?";
                          con.query(paymentQry, ['1',data.ride_id,msg_from], (err, done) => {
                            if (err) {
                              throw(err);
                            } else {
                              //console.log("msg updateded")
                            }
                          })
 
})
 //used to send is driver or customer is on same chat screen if they are on same screen then show ol else increse the count of chat badges

  socket.on('onScreenMsg', (data) => {
   ////console.log("onScreenMsg function ====> ===========",data);
    showOnline(data)
   

  })


 socket.on('callBackUrl', (data) => {
   callBackUrldata(data);
    ////console.log("callBackUrl dataaaaaaaaa",data);
  })

 socket.on('updateChekoutIdMpesa', (data) => {
  //console.log("updateChekoutIdMpesa dataaaaaaaaa",data);
  var Payment = new Promise((resolve, reject) => {
     let updateRideqry = "UPDATE payment_by_customer SET CheckoutRequestID=? WHERE  ride_id = ?";
                  con.query(updateRideqry, [data.checkoutId,data.rideId], (err, detail) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(detail);
                    }
                  })
       })  

   Payment.then((done) => {
     getOriginalSocketID(data,'updateChekoutIdMpesa',done);
    }).catch((err) => {
      console.log("This is error in cancel ride charges error", err);
      throw err;
    })
       


  })

//codeword
//customer driver or driver to customer chat
 socket.on('chat', (data) => {
   // console.log("chat dataaaaaaaaa",data);
    let chat=insertData('chat',data);
    if (data.message_from==1) {
      //if msg from 1 customer send msg emit to driver
      send_notification_driver(data);

    }else{
       send_notification('',data,"","");
    }

  })

//here we fetch the chat acc to ride id 
 socket.on('fetchChat', (data) => {
    //console.log("fetchchat dataaaaaaaaa","ride_id="+data.ride_id+"",data);

    //update is_read in table if driver fetch chat then customer is read=1 vice versa

     var driverFeedBackPromise = new Promise((resolve, reject) => {
              let feedBackQry = "UPDATE chat SET is_read=? ,is_seen=? WHERE message_from != ? AND ride_id = ?";
              con.query(feedBackQry, ['1','1',data.message_from, data.ride_id], (err, result) => {
                if (err) {
                 
                  reject(err);
                } else {
                  
                  resolve(result);
                }
              })

            })


    driverFeedBackPromise.then((result) => {
      return fetchChat("c.ride_id='"+data.ride_id+"'",data);
    }).catch((err) => {
      console.log("Error....", err);
      throw err;
    })


})

//if message_from= 0 means we are fetching the customer chat count badges and emit to driver
  socket.on('chat_badges', (data) => {
   // //console.log("chat_badges",data);
     var container = [];

      var number = data.ride_id

      for (let k = 0; k < number.length; k++) {

          var sql1 = "SELECT count(id) as chat_badges,IF(ride_id  IS NULL,"+number[k]+",ride_id) as ride_id FROM `chat` WHERE is_read=0 and ride_id = ?  and message_from!=?"

          con.query(sql1, [number[k],data.message_from], function(error, result) {
              // I will be getting the result of first element in the array here
             // //console.log("sql",result);
              
             
              let respnse = {
                'ride_id': result[0].ride_id,
                'count_badges': result[0].chat_badges
                
                }
                
                 container.push(respnse);
                 ////console.log("containerrrrrrr",container);
                  if (data.message_from==0) {
                    //emit to driver
                    sendDataObjResDriver(container,data.driverSocketId,'chat_badges');
                  }else{
                    //emit  to customer
                      sendDataObjResCustomer(container,data.customerSocketId,'chat_badges');
                  }
          });

    
         
      }//end for

     

     
   
  }) //end socket  

 






 //used to get the drop location of previous cutomer and emot to new cutomer
 socket.on('getDropLocationCustomer',(data)=>{
  ////console.log('getDropLocationCustomer listtttttt' ,data)
   var poolCustomers = new Promise((resolve, reject) => {

    var poolRideRequest = "SELECT rd.drop_location,rd.drop_cordinates,rd.id,r.status,r.customer_status  FROM `ride_request` as r JOIN request_driver as rd on r.ride_request_id=rd.id  WHERE r.driver_id=? and  r.status!=5 and  r.status!=3 and r.status!=2 and  r.customer_status!= 0 and r.customer_id !=?";
    con.query(poolRideRequest, [data.driver_id,data.customerID], (err, detail) => {
      if (err) {
        reject(err);
      } else {
        resolve(detail);
      }
    })

  })

   poolCustomers.then((result) => {
     // //console.log('get drop_locationnnnnn promiseDone',result);
      //emit to customer
      let customerData
      if (result.length!=0 && result[0].status ==1 && result[0].customer_status==3) {
        //customer that is sitting inside vehicle should have these status
              customerData = { result };
             

      }else{
         customerData = {};

      }

        client.hgetall(data.customerSocketId, (err, driverSocket) => {
          if (!driverSocket) {
             //console.log("No customer socket id found to this ", err);
            } else {
              let dataCustomer = { customerData };
              io.to(driverSocket.socket).emit('dropLocationCustomer', dataCustomer);
            }
          })
       
    
     }).catch((err) => {
        console.log("Error........", err);
     })



})


/*********************************************Return or retry Data*************************//
socket.on('returnRetryItem',(data)=>{
       getDeliveryItems(data);
})

socket.on('test_noti',(data)=>{
  ////console.log("test noti dataaaaaaaaaa");
   /*var FCM = require('fcm-node');
   var serverKey = 'AIzaSyCL2MJntG6FXurioeJ-e-gZrDLcoSPqYxU'; //server key here for android(customer)
    var fcm = new FCM(serverKey);
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'c6vRLyAnTew:APA91bFamEJ1BI1uqqKeAThuiGLUvYO1gFRWnyYbFtycQXwUPIXs_02DNd9SLm_hCVKQduBxxid6wvS-TJ5JYnN6zitkS1BOa1gPPRDvTFaj57w87Gtd109pPOtFi6eBKRcs1R34CvY3', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            ////console.log("Something has gone wrong!");
        } else {
            ////console.log("Successfully sent with response: ", response);
        }
    });*/

    

    
   /*let deviceToken = "23dbb0df47fb3545a909e261862ce4f20031510caf1a81485a89e424ede193b6";
            //////console.log("ios device_token================>",data.noti_type);


           // Prepare the notifications
           let notification = new apn.Notification();
           notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
           notification.badge = 1;
           notification.sound = "ping.aiff";
           notification.alert = "message";
           notification.title = "";
           notification.body = "message";

          notification.payload = {'data': "data"};
          
          // Replace this with your app bundle ID:
           notification.topic = "com.cabscoutcustomer.apps";

            apnProvider.send(notification, deviceToken, function(err, response){
                  if (err) {
                      ////console.log("Something has gone wrong with test_noti!",err);
                  } else {
                      ////console.log("Successfully sent with response ios test_noti: ", response);
                       //io.to(customerSocket).emit('notification', response);
                  }
              });
           
           
          // Close the server
           apnProvider.shutdown(); */



})




//get online drivers by lat long
socket.on('get_nearby_drivers',(data)=>{
 //console.log("get_nearby_driversssss",data);
  let getDriver = "SELECT * from preferences where location_id=?";
  con.query(getDriver,[data.location_id],  (err, result) => {
    if (err) {
     throw(err);
    } else {
       ////console.log('get online driverssssssss',result);
      var radius=(data.service_id==1)?result[0].radius:result[0].radiusd;
      
       if (data.car_type !=='' && data.car_type == '4' && data.vehicle_id!=='' )
        { 
          var row_dist = get_online_drivers("verified_status=1 AND (status=4 or status=1) && FIND_IN_SET("+data.car_type+",car_type) and vehicle_id="+data.vehicle_id+" and seat_pool_avail=0  and company_verify=1",data,radius);
        } else if (data.car_type !=='' && data.car_type == '44' && data.vehicle_id)
          {
                var row_dist = get_online_drivers("verified_status=1 AND (status=4 or status=1) && FIND_IN_SET("+data.car_type+",car_type) and vehicle_id="+data.vehicle_id+" and seat_delivery_avail=0  and company_verify=1", data,radius);
          }else if(data.car_type && data.vehicle_id){
               var row_dist = get_online_drivers("verified_status=1 AND status=1 && FIND_IN_SET("+data.car_type+",car_type) and vehicle_id="+data.vehicle_id+"   and company_verify=1", data,radius);
          }else{
             var row_dist = get_online_drivers("verified_status=1  && ((FIND_IN_SET('44', car_type) and (seat_delivery_avail=0)) and (status=4)|| FIND_IN_SET('4', car_type) and (seat_pool_avail=0) and (status=4)||FIND_IN_SET('3', car_type) and (status=1) || FIND_IN_SET('43', car_type)  and (status=1) ) and company_verify=1", data,radius);
          }

    }
  })


})
//update diver lat long and get driver status
socket.on('getdriversLocation',(data)=>{
  //////console.log("get_nearby_driversssss",data)
 let paymentQry = "UPDATE driver SET latitude=?,longitude=? WHERE  id = ?";
                          con.query(paymentQry, [data.latitude, data.longitude, data.driver_id], (err, done) => {
                            if (err) {
                              throw(err);
                            } else {
                                  //resolve(done);
                                  let updateRideqry ="select status from driver where id= ?";;
                                  con.query(updateRideqry, [data.driver_id], (err, detail) => {
                                    if (err) {
                                      throw(err);
                                    } else {
                                      //resolve(detail);
                                        client.hgetall(data.driverSocketId, (err, socketId) => {
                                        if (!socketId) {
                                          ////console.log("No socket found to this driverSocketId firstFunction");
                                        } else {
                                          
                                          
                                          io.to(socketId.socket).emit('getdriversLocation', {detail});  // Driver side emit and on 

                                        }

                                    })
                                     // ////console.log('dataaaaaa',detail);
                                  }})

                            }
                          })

})
 


  /* update driver status if in pool ride or in delivery ride*/

  socket.on('updatePoolDeliveryStatus',(data)=>{
    var qry;
    if(data.type == "pool"){
      qry = "UPDATE driver SET seat_pool_avail = ? WHERE id = ?";
    con.query(qry,[data.seat_pool_avail,data.driver_id],(err,done)=>{
       if(err){
        ////console.log("No data is updated in driver table using updatePoolDeliveryStatus");
       }else{
        ////console.log("Updated in updatePoolDeliveryStatus");
       }
    })

    }
    if(data.type == "delivery"){
         qry = "UPDATE driver SET seat_delivery_avail = ? WHERE id = ?";
      con.query(qry,[data.seat_delivery_avail,data.driver_id],(err,done)=>{
       if(err){
        ////console.log("No data is updated in driver table using updatePoolDeliveryStatus");
       }else{
        ////console.log("Updated in updatePoolDeliveryStatus");
       }
    })
    }
  });

   socket.on('addPathLatLng',(data)=>{
   // //console.log("addPathLatLnggggg",data)
    let paymentQry = "INSERT INTO addPathLatLng(ride_id,lat,lng) VALUES(?,?,?)";
                      con.query(paymentQry, [data.ride_id, data.lat, data.lng], (err, done) => {
                        if (err) {
                         //console.log("error in adding lat lng ")
                         throw(err)
                        } else {
                          ////console.log("adding lat lng done ")
                        }
                      })
  });

  /* updation of pool and delivery seat availability end here*/


  /* Code for online drivers to connect with socket to generate socketid*/
  //hye3
  socket.on('driverStatus', (data,callback) => {
   console.log("Driver status function ===================>",data);
   

    var statusQry = "UPDATE driver SET status = ?, longitude = ?, latitude = ? WHERE socket_id = ?";
    
      con.query(statusQry, [data.status, data.driverLong, data.driverLat, data.driverSocketId], (err, updated) => {
        if (err) {
          throw err;
        } else {

              
              //fetch status
                let updateQry = "select status from ?? where id= ?";
                con.query(updateQry, ['driver',data.driver_id], (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                       client.hgetall(data.driverSocketId, (err, socketId) => {
                        if (!socketId) {
                          console.log("No socket found to this driver socekt id driver status 0");
                        } else {
                         // console.log("driver status 00000======================>",result);
                          let busy=(data.status=="0")?"1":"0";
                          updateDriverStatusRedis(data.driverSocketId, socketId.socket, busy);
                          if(data.status=="1" || data.status=="0")
                          {
                            send_notification_driver(data);
                          }

                           //emit data to driver
                           if(callback)
                           {
                            callback(result);
                           }else{
                            console.log("no ack found")
                           }
                           
                           
                          


                        }
                      })

                    
                  }

                })

            

        }

      })

  })



//hye2
  socket.on('onlineDriver', (data) => {
   // console.log("onlineDriver function ====> ===========",data);
    let driverSocketId = data.driverSocketId; //socket id of driver 619
    let driverSocket = socket.id;
    if (typeof (data.driverSocketId) !== "undefined") {
      let busy = "0";
      redisData(driverSocketId, driverSocket, busy);     /* Generate redis key */
    }else {
      console.log("driver socekt id getting null from frontend  in onlineDriver method.")
    }
    socket.on('disconnect', () => {
        console.log("disconnect driver method===================================================>>>>",data.driverSocketId);
        
            var statusQry = "UPDATE driver SET status = ? WHERE socket_id = ?";
            con.query(statusQry, ["0", data.driverSocketId], (err, updated) => {
              if (err) {
                //throw err;
                console.log("socket disconnect method =======>",err);
              } else {
                console.log("socket disconnect method =======> driver status updated");
              }

            })
            //send_notification_driver(data,'driver_offline');


        client.del(data.driverSocketId, (err, deleted) => {
          if (!deleted) {
            console.log("No data is deleted from redis database");
          } else {
            console.log("Deleted driver socketId from redis database using disconnect method");
          }
        })

    });






  })

  /* End of online driver code here*/


  /*Code for online customer to connect with socket to generate socketid */
  socket.on('onlineCustomer', (data) => {
    ////console.log("onlineCustomer function ============>",data);
    let customerSocket = socket.id;
    if (typeof (data.customerSocketId) !== "undefined") {

      let busy = "0";
      redisData(data.customerSocketId, customerSocket, busy);
      //////console.log("redis customer_id issssss")
    } else {
      //console.log("Customer socekt id getting null from frontend  in onlineCustomer method.")
    }

    socket.on('disconnect', () => {
      //  //console.log("disconnect customer method===================================================>>>>",data.customerSocketId);
        
           client.del(data.customerSocketId, (err, deleted) => {
            if (!deleted) {
              //console.log("No data is deleted from redis database");
            } else {
              //console.log("Deleted customer socketId from redis database using disconnect method");
            }
          })
        

      });


  })

  /*End of online customer code here*/



  /* CODE FOR SINGLE OR ONE TO ONE DRIDE START  HERE */

  /* Code to  available drivers when customer request for ride then this method of socket 
     will hit to emit ride to respective driver */

  socket.on('availableDriver', (data) => {  // customer side emit function
 //  //console.log("availableDriver====================================>",data);
   
    if (typeof (data.customerSocketId) !== "undefined") {

      client.hgetall(data.customerSocketId, (err, customerSocket) => {
        if (!customerSocket) {
          let busy = "0";
          let socketCustomer = socket.id;
          redisData(data.customerSocketId, socketCustomer, busy);
          client.hgetall(data.driverSocketId, (err, result) => {
            ////console.log("available driver get redis data",result);

            if (!result) {
              rideRejectedByDriver(data, data.customerSocketId);
            } else {
              //console.log("Available Driver ==================>",data);
              /*If driver socket is found in database then socket will emit notification to respective driver */

              let selectQuery = "SELECT status FROM driver WHERE socket_id = ?";
              con.query(selectQuery, [data.driverSocketId], (err, driverStatus) => {
                if (err) {
                  ////console.log("Error to find driverStatus");
                } else {
                 //console.log('driver status============================>',driverStatus);
                  if (driverStatus[0].status == '0') {
                    //console.log("Do nothing to emit to emit driver");
                  }
                  if (driverStatus[0].status == '1') {
                    if (result.busy == "0") {
                      io.to(result.socket).emit('requestDriver', data); // Driver side socket on function
                      let busy = "1";
                      updateDriverStatusRedis(data.driverSocketId, result.socket, busy);
                    } else {
                      rideRejectedByDriver(data, data.customerSocketId);
                    }

                  }
                }
              })

            }


          })

        } else {
         //console.log("available driver no customer socket id found");

          client.hgetall(data.driverSocketId, (err, result) => {
           //console.log("available driver no driver",result);
            if (!result) {
              //console.log("hello");
              rideRejectedByDriver(data, data.customerSocketId);
            } else {
              //////console.log("dfdsfgdgd");
              /*If driver socket is found in database then socket will emit notification to respective driver */
              let selectQuery = "SELECT status FROM driver WHERE socket_id = ?";

              con.query(selectQuery, [data.driverSocketId], (err, driverStatus) => {
                if (err) {
                  ////console.log("Error to find driverStatus");
                } else {
                  if (driverStatus[0].status == '0') {
                    ////console.log("Do nothing to emit to emit driver");
                  }
                  if (driverStatus[0].status == '1') {
                    if (result.busy == "0") {
                      io.to(result.socket).emit('requestDriver', data); // Driver side socket on function
                      let busy = "1";
                      updateDriverStatusRedis(data.driverSocketId, result.socket, busy);
                    } else {
                      rideRejectedByDriver(data, data.customerSocketId);
                    }

                  }
                }
              })

            }


          })

        }

      })


    } else {
      //console.log("Customer socekt id getting null from frontend  in onlineCustomer method.")
    }

  });

  /* Code for driver if driver accept or reject the ride of repective customer*/

  socket.on('confirmDriver', (data) => { // Driver side emit function
      ////console.log("Confirm Driver funstion =========>",data);
    if (data.driverConsent == 'accept') {
      
      var checkBusyDriver = new Promise((resolve, reject) => {
        client.hgetall(data.driverSocketId, (err, socketId) => {
          if (!socketId) {
            reject(err);
          } else {
            resolve(socketId);
          }
        })
      })

      function rideStart() {

        return new Promise((resolve, reject) => {

          client.hgetall(data.customerSocketId, (err, result) => {

            if (!result) {
              reject(err);
            } else {
              /*If diver accept the ride then socket connection establish between  customer and driver*/

              if (data.onGoingRide == "true") {
                ////console.log("Do not emit to the customer");
              } else {
                let type = "regular";
                requestAcceptedByDriver(data, result.socket, type); //Function call if driver accept the ride
                resolve(result);
              }

            }

          })

        })

      }

      checkBusyDriver.then((done) => {

        client.hgetall(data.driverSocketId, (err, socketDriver) => {
          if (!socketDriver) {
            let busy = "0";
            let driverSocket = socket.id;
            redisData(data.driverSocketId, driverSocket, busy);
            return rideStart();
          } else {
            return rideStart();
          }
        })

      }).then((result) => {
        ////console.log("Response from rideStart");
      }).catch((err) => {
        console.log("error in catch statement",err);
        throw err;
      })

    }

    /* Code if driver reject the ride */

    if (data.driverConsent == 'reject') {
   
      client.hgetall(data.driverSocketId, (err, socketId) => {
        if (!socketId) {
          ////console.log("No fund socket of driver socket id");
          let busy = "0";
          let driverSocket = socket.id;
          redisData(data.driverSocketId, driverSocket, busy);
          client.hgetall(data.customerSocketId, (err, result) => {
            /*If driver reject or hold the notification for 10 second and do nothing then the socket will alert customer to move for next driver */
            if (!result) {
              ////console.log("No socket id found to this user");
            } else {
              let type = "regular";
              let busy = "0";
              client.hgetall(data.driverSocketId, (err, driverSocket) => {
                if (err) {
                  ////console.log("Error using confirmDriver function", err);
                } else {
                  requestRejectedByDriver(data, result.socket, type); // If driver rejected ride
                  updateDriverStatusRedis(data.driverSocketId, driverSocket.socket, busy)

                }
              })

            }

          })

        } else {

          client.hgetall(data.customerSocketId, (err, result) => {
            /*If driver reject or hold the notification for 10 second and do nothing then the socket will alert customer to move for next driver */
            if (!result) {
              ////console.log("No socket id found to this user");
            } else {
              let type = "regular";
              let busy = "0";
              client.hgetall(data.driverSocketId, (err, driverSocket) => {
                if (err) {
                  ////console.log("Error using confirmDriver function", err);
                } else {
                  requestRejectedByDriver(data, result.socket, type); // If driver rejected ride
                  updateDriverStatusRedis(data.driverSocketId, driverSocket.socket, busy)

                }
              })

            }

          })

        }

      })

  

    }

    /*Code for reject  ride from driver side  ends here*/

  })

  /* Tracking  code start here between driver  and customer*/

  /*Tracking started here private_message is method for tracking*/

 socket.on('private_message', (msg) => {  //Driver emit funtion with latitude and longitude  
    /*Code where driver emit his lat long to connected customer*/
   ////console.log("private_message =================>",msg);

    client.hgetall(msg.customerSocketId, (err, result) => {
      if (!result) {
        //console.log("private_message.customerSocketId not found");

         let type = "regular";
        if (msg.noti_type == 'driver_location') {
          //sendDataObjResCustomer(msg,msg.customerSocketId,'add_message')
          //io.to(result.socket).emit('add_message', msg); // Customer emit and on function
          //console.log("nothing to emit on driver location private msg")
        }

        if (msg.noti_type == "driver_arrived") {
          driverArrived(msg.customerSocketId,msg, '', type);
          
        }

        if (msg.noti_type == 'trip_started') {
          tripStarted(msg.customerSocketId,msg, '', type);
        }

        if (msg.noti_type == 'trip_completed') {
          tripCompleted(msg.customerSocketId,msg, '', type);
        }

         if (msg.noti_type == 'cash_payment') {
          updateDriverStatus("1", msg.driverSocketId);
          //send noti to customer
          send_notification('',msg,"",'')
          //io.to(result.socket).emit('add_message', msg);
          //sendDataObjResCustomer(msg,msg.customerSocketId,'add_message')
          paymantDoneDriver(msg, type);
        }

        if (msg.noti_type == 'driverFeedBack') {
          driverFeedBack(msg);
        }

      } else {
       //  //console.log("private_message.customerSocketId  foundddddddddddd");
        /* Lat long emitted to customer*/
        let type = "regular";
        if (msg.noti_type == 'driver_location') {

          io.to(result.socket).emit('add_message', msg); // Customer emit and on function
        }

        if (msg.noti_type == "driver_arrived") {
          driverArrived(msg.customerSocketId,msg, result.socket, type);
          
        }

        if (msg.noti_type == 'trip_started') {
          tripStarted(msg.customerSocketId,msg, result.socket, type);
        }

        if (msg.noti_type == 'trip_completed') {
          tripCompleted(msg.customerSocketId,msg, result.socket, type);
        }

       if (msg.noti_type == 'cash_payment') {
          updateDriverStatus("1", msg.driverSocketId);
          io.to(result.socket).emit('add_message', msg);
          //sendDataObjResCustomer(msg,msg.customerSocketId,'add_message')
          paymantDoneDriver(msg, type);
           send_notification("",msg,"","")
        }

        if (msg.noti_type == 'driverFeedBack') {
          driverFeedBack(msg);
        }
      

      }
    })

     

  })

  /*Code for tracking end here*/


  /* Code if customer cancel his/her ride */

  socket.on('confirmCustomer', (data) => {

    client.hgetall(data.driverSocketId, (err, result) => {
      if (!result) {
        console.log("No socket found to this driverSocketId if ride cancel by customer side");
        getCustomerList(data);
        if(data.noti_type=='cancel_ride')
        {

          //get minimun charges of ride of vehicle
          getCustomercharges(data,'pool');
        }

      } else {

        /* If customer cancel the ride then socket alert the driver aboute  cancellation of ride from customer side */
        getCustomerList(data);
        if(data.noti_type=='cancel_ride')
        {

          //get minimun charges of ride of vehicle
          getCustomercharges(data,'pool');
        }
       
        io.to(result.socket).emit('finalConfirmation', data);

      }

    })

  })

  /* Code of ride cancellation by customer ends here*/

  /* END  OF SINGLE OR ONE TO ONE  RIDE HERE */

  //====================================================================================================================//
  /* CODE FOR POOL RIDE START HERE */

  /* customer request ride for pool ride code starts here*/
  socket.on('PoolAvailableDriver', (data) => {
   ////console.log("PoolAvailableDriver dataaaaaaaaaaaaaaaaaaa",data);
    if (typeof (data.customerSocketId) !== "undefined") {
      client.hgetall(data.customerSocketId, (err, customerSocket) => {
        if (!customerSocket) {
          let busy = "0";
          let customerSocket = socket.id;
          redisData(data.customerSocketId, customerSocket, busy);
          client.hgetall(data.driverSocketId, (err, result) => {

            if (!result) {
              rideRejectedByDriver(data, data.customerSocketId);
            } else {
              /* Notify driver for rquested ride for accept or reject the ride of customer*/

              let selectQuery = "SELECT status FROM driver WHERE socket_id = ?";

              con.query(selectQuery, [data.driverSocketId], (err, driverStatus) => {
                if (err) {
                  ////console.log("Error to find driverStatus");
                } else {
                  if (driverStatus[0].status == '0') {
                    ////console.log("Do nothing to emit to emit driver");
                  }
                  if (driverStatus[0].status == '1' || driverStatus[0].status == '4') {

                    if (result.busy == "0") {
                      if (driverStatus[0].status == '1') {
                        let busy = "1";
                        updateDriverStatusRedis(data.driverSocketId, result.socket, busy);
                      }
                      io.to(result.socket).emit('PoolRequestDriver', data);
                    } else {
                      rideRejectedByDriver(data, data.customerSocketId);
                    }
                  }
                }
              })


            }

          })


        } else {

          client.hgetall(data.driverSocketId, (err, result) => {
            if (!result) {
              rideRejectedByDriver(data, data.customerSocketId);

            } else {
              /* Notify driver for rquested ride for accept or reject the ride of customer*/
              let selectQuery = "SELECT status FROM driver WHERE socket_id = ?";

              con.query(selectQuery, [data.driverSocketId], (err, driverStatus) => {
                if (err) {
                  ////console.log("Error to find driverStatus");
                } else {
                  if (driverStatus[0].status == '0') {
                    ////console.log("Do nothing to emit to emit driver");
                  }
                  if (driverStatus[0].status == '1' || driverStatus[0].status == '4') {

                    if (result.busy == "0") {
                      io.to(result.socket).emit('PoolRequestDriver', data);
                      let busy = "1";
                      updateDriverStatusRedis(data.driverSocketId, result.socket, busy);
                    } else {
                      rideRejectedByDriver(data, data.customerSocketId);
                    }
                  }
                }
              })


            }

          })

        }
      })
    } else {
         ////console.log("No customer socket id is getting from frontend  in pool request");
        }


  });

  /* If driver accepted the ride then socket connection established between driver and customer pool rider request*/

  socket.on('driverLocation', (msg) => {
    var poolCustomers = msg.customersPool;
    if (poolCustomers.length > 0 && typeof (poolCustomers) !== "undefined") {

      poolCustomers = msg.customersPool; let customers = msg.customersPool;
      poolCustomers = customers.filter(function (customer, index, inputCustomers) {
        return inputCustomers.indexOf(customer) == index;
      });

      for (let customerIndex = 0; customerIndex < poolCustomers.length; customerIndex++) {

        client.hgetall(poolCustomers[customerIndex], (err, result) => {
          if (!result) {
            ////console.log("No socket found to this using in driverLocation method");

          } else {
            if (msg.noti_type == 'driver_location') {
              io.to(result.socket).emit('locationDriver', msg);
            }

          }

        })

      }

    }



  })

  // Tracking Delivery order by driverDelivery Order

  socket.on('driverDeliveryLocation', (msg) => {

    var deliveryCustomers = msg.deliveryCustomers;
    if (deliveryCustomers.length > 0 && typeof (deliveryCustomers) !== "undefined") {

      deliveryCustomers = msg.deliveryCustomers; let customers = msg.deliveryCustomers;
      deliveryCustomers = customers.filter(function (customer, index, inputCustomers) {
        return inputCustomers.indexOf(customer) == index;
      });

      for (let customerIndex = 0; customerIndex < deliveryCustomers.length; customerIndex++) {

        client.hgetall(deliveryCustomers[customerIndex], (err, result) => {
          if (!result) {
            ////console.log("No socket found to this using driverDeliveryLocation  method");

          } else {
            ////console.log("socket found to this using driverDeliveryLocation  method",result);
            if (msg.noti_type == 'driver_location') {
              io.to(result.socket).emit('locationDriver', msg);
            }

          }

        })

      }

    }

  })


  //Tracking pool Customers

  socket.on('tracking', (trackingData) => {
   ////console.log("tracking deliver_dataaaaaaaaaaaaaaaaaaaa",trackingData);
    if (typeof (trackingData.customersPool) !== "undefined") {
      let customers = trackingData.customersPool;
      var poolCustomers = customers.filter(function (customer, index, inputCustomers) {
        return inputCustomers.indexOf(customer) == index;
      });

    }

    poolCustomers = trackingData.customersPool;
   // ////console.log("tracking poolCustomers_dataaaaaaaaaaaaaaaaaaaa",poolCustomers);
    /* socket emitted lat long of drive to connected customers in pool ride*/

    if (typeof (poolCustomers) !== "undefined") {

      if (poolCustomers.length > 0) {

        for (let customerIndex = 0; customerIndex < poolCustomers.length; customerIndex++) {
          let type = "pool";

          client.hgetall(poolCustomers[customerIndex], (err, result) => {
            if (!result) {
              //console.log("No socket found  in getting customer socket id tracking", err);
              sendReqPool(trackingData.customerSocketId,trackingData,'', type)
            } else {
              //console.log("socket found  tracking", err);
              sendReqPool(trackingData.customerSocketId,trackingData, result.socket, type)

            }//end else

          })

        }

      }

    }

    if (trackingData.noti_type == 'cash_payment') {
      let type = "pool";
      paymantDoneDriver(trackingData, type);
      client.hgetall(trackingData.customerSocketId, (err, resultSocket) => {

        if (!resultSocket) {
          ////console.log("No socket is found this customerSocketId");
        } else {
          send_notification("",trackingData,"","")
          io.to(resultSocket.socket).emit('driverTracking', trackingData);
          if (trackingData.Pool_final == "true" && trackingData.Pool_final !== "undefined") {
            let statusQry = "UPDATE driver SET status = ? WHERE socket_id = ?";
            con.query(statusQry, ["1", trackingData.driverSocketId], (err, statusUpdated) => {
              if (err) {
                ////console.log("No data updated in driver table", err);
              } else {
                ////console.log("Driver status is updated in driver table");
              }
            })
          }

        }

      })

    }


  })


function sendReqPool(customers,trackingData, socketId, type) {
     if (trackingData.noti_type == 'driver_arrived') {

        driverArrived(customers,trackingData, socketId, type);
      }

      if (trackingData.noti_type == 'trip_started') {
        tripStarted(customers,trackingData, socketId, type);
      }

      if (trackingData.noti_type == 'trip_completed') {
        tripCompleted(customers,trackingData, socketId, type);
      }

      if (trackingData.noti_type == 'driverFeedBack') {
        driverFeedBack(trackingData);
      }
  
}

  socket.on('PoolConfirmDriver', (data) => {
  ////console.log("pollConfirmDriver dataaaaaaaaa",data);
    if (data.driverConsent == 'accept') {

      process.env.driverConsent = data.driverConsent;
      var customers = data.customersPool;

      var poolCustomers = customers.filter(function (customer, index, inputCustomers) {
        return inputCustomers.indexOf(customer) == index;
      });

      /* socket emitted lat long of drive to connected customers in pool ride*/
      for (let customerIndex = 0; customerIndex < poolCustomers.length; customerIndex++) {

        client.hgetall(poolCustomers[customerIndex], (err, result) => {
          if (!result) {
            ////console.log("No socket found to this user in PoolAvailableDriver function");
          } else {
            ////console.log("pollConfirmDriver dataaaaaaaaa customer socket",result.socket);
            if (data.onGoingRide == "true") {
              ////console.log("Do not emit ride to the respective customers");
            } else {
              let type = "pool";
              requestAcceptedByDriver(data, result.socket, type);
            }

          }
        })
      }

    }

    /* If pool ride is rejected by the driver then socket alert customer to move for the next driver */

    if (data.driverConsent == 'reject') {
      client.hgetall(data.customerSocketId, (err, result) => {
        if (!result) {
          ////console.log("No socket found to this user ");
        } else {
          let type = "pool";
          let busy = "0";
          client.hgetall(data.driverSocketId, (err, driverSocket) => {
            if (err) {
              ////console.log("No socket found to this user ");
            } else {
              updateDriverStatusRedis(data.driverSocketId, driverSocket.socket, busy);
              requestRejectedByDriver(data, result.socket, type);

            }
          })


        }
      })


    }

  })

  socket.on('poolConfirmCustomer', (data) => {
    //console.log("pool confirm customer dataaaaaa",data);
    client.hgetall(data.driverSocketId, (err, result) => {
      if (!result) {
        ////console.log("No socket found to this driverSocketId if ride cancel by customer side");

      } else {
        let busy = "0";
        updateDriverStatusRedis(data.driverSocketId, result.socket, busy);
        poolCustomerList(data);
        if(data.noti_type=='cancel_ride')
        {
          getCustomercharges(data,'pool');
        }
        
        
        io.to(result.socket).emit('finalPoolConfirmation', data);

      }

    })

  })

  //====================================================================================================================//
  /* CODE FOR POOL RIDE ENDS HERE */




  //====================================================================================================================//
  /* CODE FOR DELIVERY  STARTS HERE */

  socket.on('customerDeliveryOrder', (data) => {
    console.log("customerDeliveryOrder alll dat found 3706",data)
    client.hgetall(data.customerSocketId, (err, customerSocket) => {
      if (!customerSocket) {
        console.log("customerDeliveryOrder no customer socket id not found 3709")
        let customerSocket = socket.id;
        let busy = "0";
        redisData(data.customerSocketId, customerSocket, busy);
        client.hgetall(data.driverSocketId, (err, result) => {
          if (!result) {
            console.log("customerDeliveryOrder no driver socket id not found 3715")
            client.hgetall(data.customerSocketId, (err, customerSocket) => {
              /* If driver socket is null or not found in redis database then socket alert customer to move for next driver */
              if (!customerSocket) {
                console.log("No socket found to this user id");
              } else {
                 console.log("cuatomer  socket found to this user id 3712");
                io.to(customerSocket.socket).emit('deliveryRideRejected', data);

              }


            })

          } else {
            /* Notify driver for rquested ride for accept or reject the ride of customer*/

             console.log("customerDeliveryOrder socket id  found",result.busy)
            let selectQry = "SELECT status FROM driver WHERe socket_id=?";
            con.query(selectQry, [data.driverSocketId], (err, driverStatus) => {
              if (err) {
                console.log("Error to find drverStatus ");
              } else {
                if (driverStatus[0].status == '0') {
                  console.log("Do nothing to emit driver");
                }
                if (driverStatus[0].status == '1' || driverStatus[0].status=='4') {

                  if (result.busy == "0") {
                    getDeliveryOrder(data, result.socket);
                  } else {
                    rideRejectedByDriver(data, data.customerSocketId);
                  }

                }
              }
            })


          }

        })

      } else {
        
        client.hgetall(data.driverSocketId, (err, result) => {
          if (!result) {
             console.log("customerDeliveryOrder socket id not found 3759")        
            client.hgetall(data.customerSocketId, (err, customerSocket) => {
              /* If driver socket is null or not found in redis database then socket alert customer to move for next driver */
              if (!customerSocket) {
                console.log("No socket found to this user id");
              } else {
                io.to(customerSocket.socket).emit('deliveryRideRejected', data);

              }


            })

          } else {

            /* Notify driver for rquested ride for accept or reject the ride of customer*/

            let selectQry = "SELECT status FROM driver WHERe socket_id=?";
            con.query(selectQry, [data.driverSocketId], (err, driverStatus) => {
              if (err) {
                console.log("Error to find drverStatus ");
              } else {
                if (driverStatus[0].status == '0') {
                  console.log("Do nothing to emit driver");
                }
                if (driverStatus[0].status == '1' || driverStatus[0].status=='4') {
                 console.log("Do nothing to emit driverrrr",result.busy);
                  if (result.busy == "0") {
                    getDeliveryOrder(data, result.socket);
                  } else {
                    rideRejectedByDriver(data, data.customerSocketId);
                  }

                }
              }
            })


          }

        })
      }
    })

  })


  socket.on('acceptDeliveryOrder', (data) => {
    console.log("acceptDeliveryOrder function ===========>",data);

    if (data.driverConsent == 'accept') {

     
      var customers = data.deliveryCustomers;

      var customersDelivery = customers.filter(function (customer, index, inputCustomers) {
        return inputCustomers.indexOf(customer) == index;
      });

      /* socket emitted lat long of drive to connected customers in pool ride*/

      for (let customerIndex = 0; customerIndex < customersDelivery.length; customerIndex++) {

        client.hgetall(customersDelivery[customerIndex], (err, result) => {
          if (!result) {
            console.log("No socket found to this user  using acceptDeliveryOrder socket method");
          } else {

           /* if (data.onGoingRide == "true") {
              console.log("Do not emit ride to the respective customers");
            } else {*/
             /*console.log("socket found to this user  using acceptDeliveryOrder socket method 3830",result.socket);*/
              let type = "delivery";
              requestAcceptedByDriver(data, result.socket, type);
           // }

          }
        })
      }

    }

    if (data.driverConsent == 'reject') {
      client.hgetall(data.customerSocketId, (err, result) => {
        if (!result) {
          ////console.log("No socket found to this user using acceptDeliveryOrder socket method");
        } else {
          let type = "delivery";
          let busy = "0";
          client.hgetall(data.driverSocketId, (err, driverSocket) => {
            if (!driverSocket) {
              ////console.log("No socket id found to this  using acceptDeliveryOrder socket method");
            } else {
              updateDriverStatusRedis(data.driverSocketId, driverSocket.socket, busy);
              requestRejectedByDriver(data, result.socket, type);
            }
          })

        }
      })


    }

  });

  /*socket.on('test', (data) => {
    //console.log("testttt dataaaaaaaaaa===>",data);
    let customers = data.deliveryCustomers;
    if (customers.length > 0) {
      customers.forEach(myFunction);

          function myFunction(item, index) 
          {
            //console.log("++++++++++++++customers areee+++++++",item);
             client.hgetall(item, (err, result) => {
               if (!result) {
                  //console.log("No socket found to this user  using deliveryTracking socket method ");
                } else {
                  //console.log("++++++++++++++driver arrived+++++++",result.socket);
                  let message = "Hello sumit sir";
                  send_notification(item,data,result.socket,message)
                }

             })
          }//end myFunction

    }


})*/



  socket.on('deliveryTracking', (trackingData) => {
    console.log("deliveryTracking dataaaaaaaaaa===>",trackingData);
   /* if(trackingData.noti_type=='trip_started')
    {
      sms(trackingData);
    }*/
    
    if (typeof (trackingData.deliveryCustomers) !== "undefined") {
      let customers = trackingData.deliveryCustomers;
      var deliveryCustomers = customers.filter(function (customer, index, inputCustomers) {
        return inputCustomers.indexOf(customer) == index;
      });

    }

    
    if (typeof (deliveryCustomers) !== "undefined") {

      if (deliveryCustomers.length > 0) {
        let nonZero=deliveryCustomers.filter(Number);

        for (let customerIndex = 0; customerIndex < nonZero.length; customerIndex++) {

          let type = "delivery";
          client.hgetall(nonZero[customerIndex], (err, result) => {
            if (!result) {
              console.log("No socket found to this user  using deliveryTracking socket method ");
               sendReq(nonZero[customerIndex],trackingData,'',type)
            } else {
              console.log("++++++++++++++driver arrived+++++++",nonZero[customerIndex]);
               sendReq(nonZero[customerIndex],trackingData,result.socket,type)
            }

          })

        }//end for

      }

    }else{
        //console.log("******deliveryCustomers list not find***********");

      }
   


    if (trackingData.noti_type == 'cash_payment') {
      
      let type = "delivery";
      paymantDoneDriver(trackingData, type);
      client.hgetall(trackingData.customerSocketId, (err, resultSocket) => {
        if (!resultSocket) {
         // ////console.log("No socket is found this customerSocketId using deliveryTracking socket method");
        } else {
            io.to(resultSocket.socket).emit('trackingDelivery', trackingData);

            if(trackingData.receiverSocketId !=='' || trackingData.receiverSocketId !=="undefined")
            {
             // ////console.log("receiver socket id found =================================>");
               client.hgetall(trackingData.receiverSocketId, (err, resolve) => {
                if(!resolve)
                {
                  //////console.log("No socket is found this receiverSocketId using deliveryTracking socket method");

                }else{
                  io.to(resolve.socket).emit('trackingDelivery', trackingData);
                }

               })

            }else{
             // ////console.log("No Receiver found");
            }
            if (trackingData.Delivery_final == "true" && trackingData.Delivery_final !== "undefined") {
              let statusQry = "UPDATE driver SET status = ? WHERE socket_id = ?";
              con.query(statusQry, ["1", trackingData.driverSocketId], (err, statusUpdated) => {
                if (err) {
                 // ////console.log("No data updated in driver table", err);
                } else {
                  //////console.log("Driver status is updated in driver table");
                }
              })
            }
            send_notification('',trackingData,"",'')

        }

      })




    }


  })

  function sendReq(customers,trackingData,socketId,type) {

      if (trackingData.noti_type == 'driver_arrived') {
        driverArrived(customers,trackingData, socketId, type);
      }

      if (trackingData.noti_type == 'trip_started') {
        tripStarted(customers,trackingData, socketId, type);

      }

      if (trackingData.noti_type == 'trip_completed') {

        tripCompleted(customers,trackingData, socketId, type);

      }

      if (trackingData.noti_type == 'driverFeedBack') {

        driverFeedBack(trackingData);
      }
  }




  socket.on('deliveryConfirmCustomer', (data) => {
    //console.log('deliveryConfirmCustomer dataaa',data);
    client.hgetall(data.driverSocketId, (err, result) => {
      if (!result) {
       // ////console.log("No socket found to this driverSocketId if ride cancel by customer side using deliveryConfirmCustomer socket method");
      } else {
        /* If customer cancel the ride then socket alert the driver aboute cancellation of ride from customer side */
        if(data.noti_type=='cancel_ride')
        {
          getCustomercharges(data,'delivery');
        }

        getDeliveryItems(data);
        io.to(result.socket).emit('finalDeliveryConfirmation', data);

      }

    })



  })

  //====================================================================================================================//
  /* CODE FOR DELIVERY ENDS HERE */



  /* Method for disconnection for client(driver) when driver in toggling offline and online or in background */

  /*Ride  cancel by driver side starts here (Ride Cancel)*/

  socket.on('requestCancelByDriver', (data,callback) => {

    if (typeof (data.customerSocketId) !== "undefined") {
      client.hgetall(data.customerSocketId, (err, socketCustomer) => {
        if (!socketCustomer) {
          console.log("No socket found to this customer socket id in requestCancelByDriver function");
          rideCancelDriver(data, '');
          
        } else {
         
          client.hgetall(data.driverSocketId,(err,result)=>{
            if(!result){

            }else{
               let busy = "0";
                 updateDriverStatusRedis(data.driverSocketId, result.socket, busy);
            }
          })
          rideCancelDriver(data, socketCustomer.socket);
           //emit data to driver
                           if(callback)
                           {
                            callback(socketCustomer);
                           }else{
                            console.log("no ack found requestCancelByDriver")
                           }
        }

      })

    }

  })

  /* Ride cancel ends here */



  /*Booking  cancel by customer side starts here (Booking Cancel)*/
  socket.on('requestCancel', (driversData) => {
  console.log("cancel driver bookingCancel dataaaaaaaaa",driversData);
    let driverList = driversData.drivers_list;
   // ////console.log("cancel driver driverList dataaaaaaaaa", driverList.length);
   if (typeof driverList !== 'undefined' && driverList.length > 0) {
     // ////console.log('driverList undefiiiiiiiiiiiiiiiiineddd', driverList.length);
        let drivers = driverList;
        driversList = drivers.filter(function (driver, index, inputDrivers) {
          return inputDrivers.indexOf(driver) == index;
        });


        for (let driverIndex = 0; driverIndex < driversList.length; driverIndex++) {
          client.hgetall(driversList[driverIndex], (err, cancelRequest) => {
            if (!cancelRequest) {
              ////console.log("No socket id found to this drive socket id requestCancel socket function");
            } else {

             io.to(cancelRequest.socket).emit('bookingCancel', driversData);
            let busy = "0";
            updateDriverStatusRedis(driverList[driverIndex], cancelRequest.socket, busy);
            //update ride satus
            
        // let statuss=(driversData.noti_type=='no_new_driver_found')?7:6;
        var get_device = new Promise((resolve, reject) => {
              let updateQry = "update ride_request set  status=? where id=?";
                con.query(updateQry, ['6',driversData.ride_id], (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                     resolve(result);
                    
                  }

                })
              })

            }
          })
        }

    }else{
      //driver list empty then set ride status is
       var get_device = new Promise((resolve, reject) => {
              let updateQry = "update ride_request set  status=? where id=?";
                con.query(updateQry, ['7',driversData.ride_id], (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                     resolve(result);
                    
                  }

                })
              })

    }

  })

  /*HeartBeat use for client to check client is connected with socket or disconnected */

  /* Pong is client side socket function */
  socket.on('beat', (data) => {
    // ////console.log("data of beat function socket method ========>",data);

    if (typeof (data.driverSocketId) !== "undefined" && data.driverSocketId !== '') {

      let socketId = socket.id;
      let id = data.driverSocketId;
      redisSocket(id, socketId);
      reverseRedisValueKey(socketId, id);

    }
    if (typeof (data.customerSocketId) !== "undefined" && data.customerSocketId !== '') {
      let socketId = socket.id;
      let id = data.customerSocketId;
      redisSocket(id, socketId);
      reverseRedisValueKey(socketId, id);

    }
  });

 socket.on('delClient', (reason) => {
   // socket.socket.reconnect();
   // ////console.log("delClient method===================================================>>>>",reason)
    
    client.del(reason.driverSocketId, (err, deleted) => {
      if (!deleted) {
        ////console.log("No data is deleted from redis database");
      } else {
        ////console.log("Deleted socketId from redis database using disconnect method");
      }
    })

  });


//bye
  /*socket.on('disconnect', (reason) => {
    //console.log("disconnect method===================================================>>>>",reason);
    let socketId = socket.id;
    client.hgetall(socketId, (err, data) => {
      if (!data) {
        //console.log("No id found to this socket reference in disconnect function");
      } else {
       //console.log("getting all disconnected id's=====================>",data);
        var statusQry = "UPDATE driver SET status = ? WHERE socket_id = ?";
        con.query(statusQry, ["0", data.id], (err, updated) => {
          if (err) {
            throw err;
          } else {

            //console.log("socket disconnect method =======>error in updating driver status");
          }

        })
        //send_notification_driver(data,'driver_offline');

      }
    })

    client.del(socketId, (err, deleted) => {
      if (!deleted) {
        //console.log("No data is deleted from redis database");
      } else {
        //console.log("Deleted socketId from redis database using disconnect method");
      }
    })

  });
*/

//bye2

/* Method for disconnection for client(driver) when driver in toggling offline and online or in background */
  socket.on('socketDisconnect', (data) => {
   console.log("socketDisconnect method=======================================>",data);
    /*CustomerSocketId deleted from redis database*/
    if (typeof (data.driverSocketId) !== "undefined") {

      client.pexpire(data.driverSocketId, 1000, (err, done) => {
        if (err) {
          //console.log("No id not expire in database");
        } else {
         //console.log("Expire data is expire is done using driverSocketId");
        }
      })
      client.del(data.driverSocketId, (err, result) => {
        if (!result) {
          return false;

        } else {

          let sqlQry = "UPDATE driver SET status = ? , longitude = ?, latitude = ?  WHERE socket_id = ?";
          con.query(sqlQry, ["0", data.driverLong, data.driverLat, data.driverSocketId], (err, updated) => {
            if (err) {
              throw err;
            } else {
             //console.log("Driver status updated in table.",data.driverSocketId);

               //send_notification_driver(data,'driver goes ofline');
               
            }
          });

          




        }//END ELSE

        
      })


    } else {
      //console.log("Driver socket id getting null from frontend in socketDisconnect method.")
    }
    /*code to delete customer socket ends here */

    /*DriverSocketId deleted from redis database */

    if (typeof (data.customerSocketId) !== "undefined") {
      client.pexpire(data.customerSocketId, 1000, (err, done) => {
        if (err) {
         //console.log("No id not expire in database");
        } else {
         //console.log("Expire data is expire is done using customerSocketId");
        }
      })

      client.del(data.customerSocketId, (err, result) => {
        if (!result) {
         //console.log("No socket found to this user id");
          return false;

        } else {
          return true;

        }

      })

    } else {
     //console.log("Customer socket id getting null from frontend in socketDisconnect method.");

    }
    /*Code to delete driver socket and customer socket using socketDisconect function ends here*/

  })

/*************************delivery tracking on receiver end******************************/

//update the receiver id in table if receiver successfully register with traala app
socket.on('add_receiver', (receiver) => {  
   // ////console.log("add_receiver =================>",receiver);
     if (typeof (receiver.receiver_id) !== "undefined" && receiver.receiver_id !== '') {
       let statusQry = "UPDATE delivery_data SET receiver_id = ? WHERE deliver_id = ?";
            con.query(statusQry, [receiver.receiver_id, receiver.deliver_id], (err, statusUpdated) => {
              if (err) {
                ////console.log("No data updated in delivery table", err);
              } else {
                  client.hgetall(receiver.driverSocketId, (err, result) => {
                  if (!result) {
                    ////console.log("No socket found to this driverSocketId  by add_receiver side");

                  } else {
                   // ////console.log("geting driver socket iddddddddddd---->",result);
                    io.to(result.socket).emit('receiver_tracking', receiver);

                  }

                })
               
              }
            })

     }

   
  })    






  setTimeout(sendHeartbeat, 10000);
  function sendHeartbeat() {
    setTimeout(sendHeartbeat, 10000);
    io.sockets.emit('ping', { beat: 1 });
  }

});




/* End of server listen code */





