const express = require("express");

const sequelize = require('./server/utils/database');
const authRoute = require('./server/routes/auth');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Authorized all Domains to use my app
  res.setHeader("Access-Control-Allow-Methods", "PUT,GET,POST,PATCH,DELETE"); //Allow The rest Api
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use('/auth',authRoute);

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode).json({
    message: err.message,
    data: err.data
  });
  next();
})

//If u want that sync work you need to create a routes into models 
sequelize.sync({
    force: false
})
.then(() => {
  console.log("Database connected!")
  app.listen(8080);
})
.catch(err => {
  console.log(err)
  console.log("Cant connect to database")
})
