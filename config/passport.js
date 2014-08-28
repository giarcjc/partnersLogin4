/**
 * Created by craigc on 8/22/14.
 */
/*




     ****   THIS FILE NOT USED!!!!  ***








* Authentication mechanisms, known as strategies, are packaged as individual modules.
* Applications can choose which strategies to employ, without creating unnecessary dependencies.
* Authenticating requests is as simple as calling passport.authenticate() and specifying which strategy to employ.
* Strategies require what is known as a verify callback.
* The purpose of a verify callback is to find the user that possesses a set of credentials.
* When Passport authenticates a request, it parses the credentials contained in the request.
* It then invokes the verify callback with those credentials as arguments, (in this case username and password.)
* If the credentials are valid, the verify callback invokes done() to supply Passport with the user that authenticated.
*       return done(null, user);
* If the credentials are not valid (for example, if the password is incorrect),
* done should be invoked with false instead of a user to indicate an authentication failure.
*       return done(null, false);
* An additional info message can be supplied to indicate the reason for the failure.
* This is useful for displaying a flash message prompting the user to try again.
*       return done(null, false, { message: 'Incorrect password.' });
* Finally, if an exception occurred while verifying the credentials (for example, if the database is not available),
* done should be invoked with an error, in conventional Node style.
*       return done(err);
* Note that it is important to distinguish the two failure cases that can occur.
* The latter is a server exception, in which err is set to a non-null value. Authentication failures are natural conditions,
* in which the server is operating normally. Ensure that err remains null, and use the final argument to pass additional details.

 By delegating in this manner, the verify callback keeps Passport database agnostic.
 Applications are free to choose how user information is stored, without any assumptions imposed by the authentication layer.
*
*
*



// load all the things we need
var LocalStrategy= require('passport-local').Strategy;

// load up the user model
var User = require('../models/user');

// expose this function to our app using module.exports

module.exports = function(passport){
    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id,function(err, user){
            done(err, user);
        });
    });

    // local signup
    // we're using named strategies since we have one for login and one for signup
    // by default, if there was no name it would just be called 'local'


    // defines a local-signup strategy
    // we use this to process our signup form
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        // we're overriding with username

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function(req, username, password, done){
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

    // local login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true  // allows us to pass back the entire request to the callback
    },
        function(req, username, password, done){ // callback with username and password from our form
           // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to login already exists
            User.findOne({'local.username': username},function(err, user){
                // if there are any errors, return the error before anything else
                if(err) return done;

                // if no user found, return message
                if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found'));   // req.flash sets flashdata via connect-flash

                // if the user is found but the password is wrong
                if(!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the login message and save it to session as flashdata

                // asll is well, return successful user
                return done(null, user);

            });


        }));
};

 */
