const User = require('../models/userModel');

const loginUser = (req, res) => {
  User.findOne({
    email: req.body.email
  }).then((respone) => {
    if(!respone){
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        img: req.body.photoURL
      })

      newUser.save()
        .then((data) => {
          res.status(200).json({
            msg: 'baru',
            user: data
          })
        })
        .catch(err => res.status(500).send(err))
    } else {
      res.status(200).json({
        msg: 'lama',
        user: respone
      })
    }
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  loginUser
}