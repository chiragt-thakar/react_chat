const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/Chat_App";

const connectToMongo = async() =>{

    try {
       await  mongoose.connect(url).then(console.log("DataBase is connected"));
      } catch (error) {
        handleError(error);
        console.log(error);
      }
}


module.exports =connectToMongo;
