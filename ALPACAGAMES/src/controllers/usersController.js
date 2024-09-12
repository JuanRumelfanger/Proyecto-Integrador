const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { validationResult, ExpressValidator } = require("express-validator");
const db = require("../database/models");
const { DATE } = require("sequelize");

const dataJson = fs.readFileSync(path.join(__dirname, "../data/users.json"));
const users = JSON.parse(dataJson);

function updateUserJSON() {
  const usersJSON = JSON.stringify(users, null, 4);
  fs.writeFileSync(path.join(__dirname, "../data/users.j  son"), usersJSON);
}

const usersController = {
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        let correctPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (correctPassword) {
          delete user.password;
          req.session.userAreLogged = user;
          console.log(req.session.userAreLogged );
          console.log(res.locals);
          if (req.body.rememberMe) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 120 });
            return res.redirect(301, "/");
          } else {
            return res.redirect(301, "/");
          }
        } else {
          return res.render("login", {
            errors: {
              email: { msg: "Esta contraseña no existe en la base de datos" },
            },
          });
        }
      } else {
        return res.render("login", {
          errors: {
            email: {
              msg: "Las credenciales no son correctas",
            },
          },
        });
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(301).redirect("/");
  },
  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    /*
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('register', { errors: errors.errors, old: req.body });
    } else {
      const imageFilename = req.file ? req.file.filename : null;
      const lastUserId = users[users.length - 1].id;
      const newUser = {
        id: lastUserId + 1,
        name: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        birthDate: req.body.birthDate,
        country: req.body.country,
        admin: false,
        avatar: req.file.filename
      };
      console.log('Funcionando');
      users.push(newUser);
      updateUserJSON();
      res.redirect('/');
    }*/
    //console.log(req.body);
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      display_name: req.body.display_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      date_of_birth: req.body.date_of_birth,
      country: req.body.country,
      avatar: req.file.filename,
    })
      .then((newUser) => {
        req.session.userAreLogged = newUser;
        res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
};

module.exports = usersController;
