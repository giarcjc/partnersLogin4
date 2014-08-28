
Partners Login Demo:
 
 The Good: 
 - Uses passport to authenticate against mongoDB via mongoose
 - uses angular routes instead of relying on server declared routes
 - now uses express 4
 
 The Bad:
 - does not conform to existing app structure and routing
 - does not use handlebars for pretty urls, 
 - individual controllers for functionality aren't getting picked up from their respective .js files 
 
 To Do: 
 - fix routing issues, controller issues, etc.


To run:
    1. start mongo
    2. create a "partnersAuth" db with a "users" collection 
    3. npm install
    4. npm start
    5. http://localhost:3000/#/register to create new user
    6. then login and explore
