var restify = require('restify');
var fs = require('fs');
var bodyParser = require('body-parser')


var controllers = {}
    , controllers_path = process.cwd() + '/controller'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})


var server = restify.createServer();

server.use(bodyParser.json())

/* code for perform basic authentication */
server.use(function authenticate(req, res, next) 
{
  var auth = req.headers['authorization'];
  if(auth=='Basic c2hhaWxlc2g6dGVzdA==')
  {
    return next();
  }
  else
  {
    res.json({ message: 'Basic authorization fail.' });
  }
});

/* function for usercontroller */
server.get('/get_users', controllers.user_controller.get_users);

server.get('/get_user_details/:id', controllers.user_controller.get_user_details);

server.post('/add_user', controllers.user_controller.add_user);

server.post('/update_user', controllers.user_controller.update_user);

server.get('/delete_user/:id', controllers.user_controller.delete_user);

/* user controller end */


server.listen(3000, function() 
{
  console.log('%s listening at %s', server.name, server.url);
});