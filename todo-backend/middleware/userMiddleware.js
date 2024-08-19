const jwt = require('jsonwebtoken')

function userMiddleware(req, res, next) {
   try {
      let token = req.headers.token;
      const decodedValue = jwt.verify(token, process.env.jwtSecret);
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
      })
   }
}

module.exports = {
   userMiddleware
}