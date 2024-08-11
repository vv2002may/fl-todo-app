const jwtSecret = require('../config/jwt.js')
const jwt = require('jsonwebtoken')

// console.log(jwtSecret)
function userMiddleware(req, res, next) {

   try {
      let token = req.headers.token;
      const decodedValue = jwt.verify(token, jwtSecret);
      if (decodedValue.email) {
         req.headers.email = decodedValue.email;
         next();
      }
      else {
         res.status(403).json({
            success:false,
            message: "You are not authenticated!"
         })
      }
   }
   catch (err) {
      console.log(err)
      res.status(401).json({
         success: false,
         message: "You are not authenticated!!!",
         // err
      })
   }
}

module.exports = {
   userMiddleware
}