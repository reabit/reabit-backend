const HttpStatus = require('http-status-codes')
const UserModel = require('../models/userModel')
module.exports = function (req, res, next) {
  console.log(req.headers)
  const email = req.headers.email
  UserModel.findOne({email: email})
  .then(result => {
    console.log(result, 'testttttt')
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