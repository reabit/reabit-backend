const HttpStatus = require('http-status-codes')
const UserModel = require('../models/userModel')
module.exports = function (req, res, next) {
  const email = req.headers.email
  UserModel.findOne({email: email})
  .then(result => {
    if(result){
      req.decoded = result
      next()
    }else{
      res.status(HttpStatus.FORBIDDEN).json({
        message: 'Youre not Authorization to do that'
      })
    }
  })
  
}