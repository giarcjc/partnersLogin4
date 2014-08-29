var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var LocalStrategy = require('passport-local').Strategy;




var configDB = require('./config/database.js');

// configuration ================================
mongoose.connect(configDB.url);
// load up the user model
var User = require('./models/user');


// REGISTRATION OF NEW USER (for demo only)
//==================================================================
// create user if one doesn't already exist
passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },


    function(req, username, password, done){
        console.log('username: ' + username);
        console.log('password: ' + password);
        // asynchronous
        // User.findOne won't fire until data is sent back
        process.nextTick(function(){
            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to login already exists

            User.findOne({ 'local.username' : username}, function(err, user){
                // if there are any errors, return the error
                if (err)  return done(err);

                // check to see if there's already a user with that username
                if(user){
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err){
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });

        });
    }));





// LOGIN FORM authenticates user if they're in the db
//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true  // allows us to pass back the entire request to the callback
},
  function(req, username, password, done) {

      User.findOne({'local.username': username},function(err, user){
          // if there are any errors, return the error before anything else
          if(err) return done;

          // these messages arent' working yet...need to figure out why
          // if no user found, return message
          if (!user)
              return done(null, false, { message: 'No user found'});

          // if the user is found but the password is wrong
          if(!user.validPassword(password))
              return done(null, false, {message: 'Oops! Wrong password.'});


          // all is well, return successful user
          return done(null, user);

      });


// hardcoded value for testing...can be deleted
//    if (username === "bif" && password === "bif") // stupid example
//      return done(null, {name: "admin"});
    //return done(null, false, { message: 'Incorrect username.' });
  }
));



// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};
//==================================================================

// Start express application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('app', __dirname + '/app');
app.set('view engine', 'ejs');
//app.use(express.favicon()); // express 3

//app.use(express.logger('dev'));  // express 3
app.use(morgan('dev')); // log every request to the console (express 4)

// express 3
//app.use(express.cookieParser());
//app.use(express.bodyParser());
//app.use(express.methodOverride());


// express 4
app.use(cookieParser()); // read cookies (needed for auth
app.use(bodyParser()); // get info from html forms
app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.


//app.use(express.session({ secret: 'securedsession' }));  // express 3
app.use(session({ secret: 'jazzflute'}));  // express 4

app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(flash()); // use connect-flash for flash messages stored in session
//app.use(app.router);   // express 3
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

//==================================================================
// routes
app.get('/', function(req, res){
  res.render('index', { title: 'Pensco Partner Portal' });
});

//app.get('/users', auth, function(req, res){
//    // need to change this to get from db
//  res.send([{name: "bif"}]);
//});
//==================================================================

//==================================================================
// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});







//===================================================================


// REGISTRATION FORM ROUTES(for demo only)
// since we defined the authentication strategy in passport.js,
// this only needs to specify where the success and failures will route to

app.get('/register', function(req, res){
    console.log('getting the registation page');
    res.render('register', { title: 'Register Pensco Partner Portal' });
});


app.post('/register', passport.authenticate('local-register', {
    successRedirect : '/', // redirect to the login page
    // we could also use a callback here
    failureRedirect : '/register' // redirect back to the signup page if there is an error
} ));



//==================================================================















http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
