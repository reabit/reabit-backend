const User = require('../models/userModel');

const loginUser = (req, res) => {
  User.findOne({
    email: req.headers.email
  }).then((respone) => {
    if(!respone){
      let newUser = new User({
        name: req.headers.name,
        email: req.headers.email,
        img: req.headers.photoURL
      })

      newUser.save()
        .then((data) => {
          res.status(200).json({
            msg: 'baru',
            user: data
          })
        })
        .catch(err => console.log(err))
    } else {
      let data
      res.status(200).json({
        msg: 'lama',
        user: respone
      })
    }
  })
  .catch(err => console.log(err));
}

module.exports = {
  loginUser
}