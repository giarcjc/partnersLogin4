
Partners Login Demo:
 
 The Good: 
 - Uses passport to authenticate against mongoDB via mongoose
 - uses angular (v1.2.23), ngRoute instead of relying on server declared routes
 - now uses express 4
 - conforms (more or less) to project structure
 
 The Bad:

 - does not use handlebars for pretty urls, 
 
 
 To Do: 
 - finish integrating into project


To run:
    1. start mongo
    2. create a "partnersAuth" db with a "users" collection 
    3. npm install
    4. npm start
    5. http://localhost:3000/#/register to create new user
    6. then login and explore
