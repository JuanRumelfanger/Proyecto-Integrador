const db = require('../../database/models');

module.exports = {
  list: (req, res) => {
    db.User.findAll().then((users) => {
      let respuesta = {
        meta: {
          status: 200,
          url: '/',
          //raw:true,
        },
        data: users,
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.User.findByPk(req.params.id).then((users) => {
      let respusta = {
        meta: {
          status: 200,
          url: '/api/users/' + req.params.id,
        },
        data: users,
      };
      res.json(respusta);
    });
  },

  create: (req, res) => {
    console.log(req.body);
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      display_name: req.body.display_name,
      email: req.body.email,
      password: req.body.password,
      date_of_birth: req.body.date_of_birth,
      country: req.body.country,
      avatar: req.body.avatar,
    })
      .then((confirm) => {
        let respuesta = {
          meta: {
            status: 200,
            url: '/api/users/create',
          },
          data: confirm,
        };
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },

  update: (req, res) => {
    console.log(req.body);
    db.User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        display_name: req.body.display_name,
        email: req.body.email,
        password: req.body.password,
        date_of_birth: req.body.date_of_birth,
        country: req.body.country,
        avatar: req.body.avatar,
      },
      {
        where: { id: req.params.id },
      },
    )
      .then((users) => {
        res.json({
          status: 200,
          data: users,
        });
      })
      .catch((error) => res.send(error));
  },

  destroy: (req, res) => {
    db.User.destroy({
      where: { id: req.params.id },
    })
      .then((user) => {
        res.json({
          status: 200,
          data: user,
        });
      })
      .catch((error) => res.send(error));
  },
};
