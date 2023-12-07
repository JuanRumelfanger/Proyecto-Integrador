const fs = require("fs");
const path = require("path");
const db = require("../database/models");

function userLogged(req, res, next) {
  if (req.cookies.userEmail) {
    db.User.findOne({
      raw: true,
      where: {
        email: req.cookies.userEmail,
      },
    }).then((user) => {
      if (user) {
        req.session.userAreLogged = user;
      }

      if (req.cookies.userEmail) {
        db.User.findOne({
          raw: true,
          where: {
            email: req.cookies.userEmail,
          },
        }).then((user) => {
          if (user) {
            req.session.userAreLogged = user;
          }
        });
        if (req.session && req.session.userAreLogged) {
          res.locals.isLogged = true;
          res.locals.userAreLogged = req.session.userAreLogged;
        }
      }
    });
  }
  next();
}
module.exports = userLogged;