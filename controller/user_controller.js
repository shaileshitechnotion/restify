var con=require('../config');

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
        status=1;
        message='Records are available.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();


      }
      else
      {
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
    var id=req.params.id  //Parameter get by url

  _connection.query("SELECT * FROM tbl_users where id=?",[id], function (err, result, fields) 
   {
    if (err)
    {
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
        status=1;
        message='Records are available.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
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
        "mobile_no": "7353535760",
        "created": "2017-05-11T00:15:15.000Z",
        "updated": "2017-05-11T00:24:45.000Z",
        "user_location_preference": "tiruchirappalli"
      }
*/

exports.add_user=function (req, res, next) 
{
    var response = [];
    var post  = {program_id: req.body.program_id, wibmo_acc_no: req.body.wibmo_acc_no,name:req.body.name,email:req.body.email,mobile_no:req.body.mobile_no,created:new Date()};

  _connection.query("INSERT INTO tbl_users SET ?",post, function (err, result, fields) 
   {
    if (err)
    {
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
        status=1;
        message='Records are sucessfully inserted.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
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
  var program_id=req.body.program_id;
  var name=req.body.name;
  var id=req.body.id;

  _connection.query("UPDATE tbl_users SET program_id = ?,name=? WHERE id = ?",[program_id,name,id], function (err, result, fields) 
   {
    if (err)
    {
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
        status=1;
        message='Records are sucessfully updated.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
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
  var id=req.params.id
  _connection.query("DELETE FROM tbl_users  WHERE id = ?",id, function (err, result, fields) 
   {
    if (err)
    {
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
        status=1;
        message='Record sucessfully deleted.';
        results=result;
        response.push({status: status, message: message,result:results});
        res.send(response);
        next();
      }
      else
      {
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