const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
//let {authtoken} = require('../routes/login')
// const cookieParser = require('cookie-parser');

// get config vars
dotenv.config();

//export default function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.TOKEN_SECRET  (err: any, user: any) => {
//     console.log(err)

//     if (err) return res.sendStatus(403)

//     req.user = user

//     next()
//   })



// function authenticateToken(req, res, next) {
//   console.log("gsfg",req.header);
//   const token = req.header['Authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
//     if (err) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     req.user = data; // Attach the user (payload) to the request object
//     next(); // Move on to the next middleware or route
//   });
// }

function authenticateToken(req,res,next){
  const authToken = req.cookies.authToken;
  // console.log(req);
  console.log("This MiddleWare is Called");
  // const token = req.header['token'];
  //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwN2Q4MDFjNzZmY2UzYmE2YTRkODdiIiwibmFtZSI6ImphY2sifSwiaWF0IjoxNjk1MDEyODg2fQ.NDYLyzDXnOek00wCeCupHCESxKaZI8vZ7t_KqgVbUkg"
//console.log(authToken);

  if(!authToken){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(authToken, process.env.TOKEN_SECRET, (err, data) => {
         if (err) {
           return res.status(403).json({ message: 'Forbidden' });
         }
         //console.log(data.user)
         req.user = data.user;
  next();
});
}
module.exports = authenticateToken;

 
