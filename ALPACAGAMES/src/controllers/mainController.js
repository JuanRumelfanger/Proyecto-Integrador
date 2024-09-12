const path = require("path");
const mainController = {
  home: (req, res) => {
    let srcImages = [
      "https://www.esportmaniacos.com/wp-content/uploads/2021/10/ffvii-min.jpg",
      "https://www.esportmaniacos.com/wp-content/uploads/2021/10/halo-min.jpg",
      "https://www.esportmaniacos.com/wp-content/uploads/2021/10/sm64-min.jpg",
      "https://www.esportmaniacos.com/wp-content/uploads/2021/10/gta-min.jpg"
    ];
    res.render("index", {videojuegos: srcImages});
  },
  register: (req, res) => {
    res.render("register");
  },
  //login: (req, res) => {
  //res.render('login');
  //},
};

module.exports = mainController;
