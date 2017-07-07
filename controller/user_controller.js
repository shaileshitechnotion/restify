var con=require('../config');
var log=require('../logger');
var sanitizer = require('../node_modules/sanitizer');
var fs = require('fs');

var _connection = con.get;

var status='';
var message='';
var results='';

_connection.connect()

/* -Function to get all the details from table.
   -Function type GET
*/

exports.get_users=function(req, res, next) 
{
    
   var response = [];
  _connection.query("SELECT * FROM tbl_users", function (err, result, fields) 
   {
    if (err)
    {
      log.error('get_users | Error : ' +err); 
      status=0;
      message=err;
      results='';
      response.push({status: status, message: message,result:results});
      res.send(response);
      next();
      //throw err;
    } 
    else
    {
      if(result!='')
      {
        
        log.info('get_users | Record available for request url '); 
        status=1;
        message='Records are available.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();


      }
      else
      {
        log.info('get_users | Record are not available for request url '); 
        status=0;
        message='Records are not available.';
        results='';
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
   }

  })  
}



/* -Function for get result by requested id
   -Function Type GET
*/
exports.get_user_details= function (req, res, next) 
{
    var response = [];
    var id=sanitizer.sanitize(req.params.id);  //Parameter get by url

  _connection.query("SELECT * FROM tbl_users where id=?",[id], function (err, result, fields) 
   {
    if (err)
    {
      log.error('get_user_details | Error : '+ err +' | Requested Parameter : ' +id); 
      status=0;
      message=err;
      results='';
      response.push({status: status, message: message,result:results});
      res.send(response);
      next();
    } 
    else
    {
      if(result!='')
      {
        log.info('get_user_details | Record are available for request Param : '+id);
        status=1;
        message='Records are available.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
        log.info('get_user_details | Record are not available for request Param : '+id);
        status=0;
        message='Records are not available.';
        results='';
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
   }
  })
}

/* -Function for insert record in database
   -Function Type POST
   -All post parameter will in Json formate
   -Sample Request body 
      {
        "program_id": "6019",
        "wibmo_acc_no": "IN6288351641692",
        "name": "sandesh shreyas",
        "email": "abc@gmail.com",
        "mobile_no": "7353535760"
      }
  -Also Accept URL Encode params
*/

exports.add_user=function (req, res, next) 
{
   console.log(req.body)
    var response = [];
    var program_id=sanitizer.sanitize(req.body.program_id);
    var wibmo_acc_no=sanitizer.sanitize(req.body.wibmo_acc_no);
    var name=sanitizer.sanitize(req.body.name);
    var email=sanitizer.sanitize(req.body.email);
    var mobile_no=sanitizer.sanitize(req.body.mobile_no);
    var post  = {program_id:program_id , wibmo_acc_no: wibmo_acc_no,name:name,email:email,mobile_no:mobile_no,created:new Date()};

  _connection.query("INSERT INTO tbl_users SET ?",[post], function (err, result, fields) 
   {
    if (err)
    {
      log.error('add_user | Error : '+ err ); 
      status=0;
      message=err;
      results='';
      response.push({status: status, message: message,result:results});
      res.send(response);
      next();
    } 
    else
    {
      if(result.affectedRows>0)
      {
        log.info('add_user | Records are sucessfully inserted : '+JSON.stringify(post));
        status=1;
        message='Records are sucessfully inserted.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
        log.info('add_user | Something went wrong while adding data : '+JSON.stringify(post));
        status=0;
        message='Something went wrong while adding data.';
        results='';
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      
   }
  })
  
}


/* -Function for update record in database by primary or other
   -Function Type POST
   -All post parameter will in Json formate
   -Sample Request Body
    {
      "program_id": "6010",
      "name": "Ashish Maru",
      "id": "20"
    }
*/

exports.update_user= function (req, res, next)
{
  var response = [];
  var program_id=sanitizer.sanitize(req.body.program_id);
  var name=sanitizer.sanitize(req.body.name);
  var id=sanitizer.sanitize(req.body.id);

  _connection.query("UPDATE tbl_users SET program_id = ?,name=? WHERE id = ?",[program_id,name,id], function (err, result, fields) 
   {
    if (err)
    {
      log.error('update_user | Error : '+ err ); 
      status=0;
      message=err;
      results='';
      response.push({status: status, message: message,result:results});
      res.send(response);
      next();
    } 
    else
    {
      if(result.affectedRows>0)
      {
        log.info('update_user | Records are sucessfully updated for Id = '+id);
        status=1;
        message='Records are sucessfully updated.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
        log.info('update_user | Something went wrong while udating data for Id = '+id);
        status=0;
        message='Something went wrong while udating data.';
        results='';
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
   }
  })
}

/* -Function for delete record by requested id
   -Function Type GET

*/
exports.delete_user= function (req, res, next)
{
  var response = [];
  var id=sanitizer.sanitize(req.params.id);
  _connection.query("DELETE FROM tbl_users  WHERE id = ?",[id], function (err, result, fields) 
   {
    if (err)
    {
      log.error('delete_user | Error : '+ err );
      status=0;
      message=err;
      results='';
      response.push({status: status, message: message,result:results});
      res.send(response);
      next();
    } 
    else
    {
      if(result.affectedRows>0)
      {
        log.info('delete_user | Records are sucessfully deleted for Id = '+id);
        status=1;
        message='Record sucessfully deleted.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
        log.info('delete_user | Something went wrong while removing data for Id = '+id);
        status=0;
        message='Something went wrong while removing data.';
        results='';
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }  
   }
  })
  
}




exports.upload_file=function (req, res, next) 
{
   var image=req.body.image;
   var decoded = new Buffer(image, 'base64');

   fs.writeFile("./Public/img/test.jpg", decoded, function(err) { });

  /* var b = new Buffer(image, 'base64')
   var s = b.toString();*/
   //console.log(decoded);
  /*  var response = [];
    var program_id=sanitizer.sanitize(req.body.program_id);
    var wibmo_acc_no=sanitizer.sanitize(req.body.wibmo_acc_no);
    var name=sanitizer.sanitize(req.body.name);
    var email=sanitizer.sanitize(req.body.email);
    var mobile_no=sanitizer.sanitize(req.body.mobile_no);
    var post  = {program_id:program_id , wibmo_acc_no: wibmo_acc_no,name:name,email:email,mobile_no:mobile_no,created:new Date()};

  _connection.query("INSERT INTO tbl_users SET ?",[post], function (err, result, fields) 
   {
    if (err)
    {
      log.error('add_user | Error : '+ err ); 
      status=0;
      message=err;
      results='';
      response.push({status: status, message: message,result:results});
      res.send(response);
      next();
    } 
    else
    {
      if(result.affectedRows>0)
      {
        log.info('add_user | Records are sucessfully inserted : '+JSON.stringify(post));
        status=1;
        message='Records are sucessfully inserted.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
        log.info('add_user | Something went wrong while adding data : '+JSON.stringify(post));
        status=0;
        message='Something went wrong while adding data.';
        results='';
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      
   }
  })*/
  
}