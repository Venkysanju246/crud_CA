const express = require('express');
const connectionToDb = require('./config/connections');
const UserRoute = require('./controllers/user.route');
const app = express();
const cors = require("cors")
app.use(cors())
const cookieParser = require('cookie-parser');
const PostRoute = require('./controllers/post.route');
app.use(cookieParser())
app.use(express.json());
app.use("/user", UserRoute)
app.use("/data", PostRoute)


app.listen(8080,async ()=>{
    try {
        await connectionToDb
        console.log("connected to database")
        console.log("connected to port 8080");
    } catch (error) {
          console.log(error.message) 
    }
   
})