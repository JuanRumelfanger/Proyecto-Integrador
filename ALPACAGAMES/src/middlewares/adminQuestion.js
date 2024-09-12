const express = require("express");
const path = require("path");
const db = require("../database/models");

function adminQuestion(req, res, next) {
  res.locals.isAdmin = false
 db.User.findOne({
    raw: true,
    where: {
      email: req.body.email,
    },
   
  })
    .then((user) => {
      let userLogin = user
      return userLogin;
  })
  .catch((error) => console.log(error));

  db.Role.findAll({
    raw:true,
  })
  .then((roles)=>{
    db.User.findOne({
      raw: true,
      where: {
        email: req.body.email,
      },
     
    })
      .then((user) => {
        //console.log(user);
        if (user.id  == 1) {
          console.log('Eres admin, log del midlleware');
          let isAdmin = true
          //console.log(isAdmin);
          req.session.isAdmin = isAdmin
          res.locals.isAdmin = req.session.isAdmin
         // console.log('Log session');
          //console.log(res.locals.isAdmin);
        } else {
          console.log('No eres admin');
        }
    })
    .catch((error) => console.log(error));
  })



 

  next();
}

module.exports = adminQuestion;
