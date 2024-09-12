const db = require('../../database/models');

module.exports = {
  list: (req, res) => {
    db.VideoGame.findAll({
      include: [
        {
          model: db.VideoGameDetail,
          as: 'details',
          attributes: ['description', 'images'],
        },
        {
          model: db.Platform,
          as: 'platforms',
          attributes: ['name'],
        },
        {
          model: db.Genre,
          as: 'genres',
          attributes: ['name'],
        },
      ],
    }).then((products) => {
      let respuesta = {
        meta: {
          status: 200,
          url: '/',
        },
        data: products,
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.VideoGame.findByPk(req.params.id, {
      include: [
        {
          model: db.VideoGameDetail,
          as: 'details',
        },
        {
          model: db.Platform,
          as: 'platforms',
          attributes: ['name'],
        },
        {
          model: db.Genre,
          as: 'genres',
          attributtes: ['name'],
        },
      ],
    })
      .then((users) => {
        let respusta = {
          meta: {
            status: 200,
            url: '',
          },
          data: users,
        };
        res.json(respusta);
      })
      .catch((error) => res.send(error));
  },

  create: async (req, res) => {
    // console.log(req.body.release_date);
    const imageFilename = req.file ? req.file.filename : null;

    try {
      const videoGameInstance = await db.VideoGame.create(
        {
          price: req.body.price,
          name: req.body.name,
          release_date: req.body.release_date,
          details: {
            description: req.body.details.description,
            size: req.body.details.size,
            images: imageFilename,
            requiments: {
              os: req.body.os,
              storage: req.body.storage,
            },
          },
        },
        {
          include: [{ model: db.VideoGameDetail, as: 'details' }],
        },
      );

      let platforms;
      if (typeof req.body.platforms === 'string') {
        const [platform] = await db.Platform.findOrCreate({
          where: { name: req.body.platforms },
        });
        platforms = [platform];
      } else {
        const platformPromises = req.body.platforms.map((name) =>
          db.Platform.findOrCreate({ where: { name } }).then(
            ([platform]) => platform,
          ),
        );
        platforms = await Promise.all(platformPromises);
      }

      const [genre] = await db.Genre.findOrCreate({
        where: { name: req.body.genre },
      });

      await Promise.all([
        videoGameInstance.addPlatforms(platforms),
        videoGameInstance.addGenre(genre),
      ]);

      console.log('Video game, details and platforms created successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  },

  update: async (req, res) => {
    const imagePath = req.file.filename;
    try {
      const product = await db.VideoGame.findByPk(req.params.id, {
        include: [
          {
            model: db.VideoGameDetail,
            as: 'details',
          },
          {
            model: db.Platform,
            as: 'platforms',
          },
          {
            model: db.Genre,
            as: 'genres',
          },
        ],
      });

      if (!product) {
        return res.status(404).send('Product not found');
      }

      const updateProduct = product.update({
        price: req.body.price,
        name: req.body.name,
        release_date: req.body.releaseDate,
      });

      const updateDetails = product.details.update({
        description: req.body.description,
        size: req.body.downloadSize,
        images: imagePath,
        requiments: {
          os: req.body.os,
          storage: req.body.storage,
        },
      });

      const updatePlatforms = Promise.all(
        product.platforms.map((platform, i) => {
          if (req.body.platforms[i]) {
            return platform.update({ name: req.body.platforms[i] });
          }
        }),
      );

      const updateGenres = Promise.all(
        product.genres.map((genre) =>
          genre.update({
            name: req.body.genre,
          }),
        ),
      );
      // Esperar a que todas las actualizaciones se completen
      await Promise.all([
        updateProduct,
        updateDetails,
        updatePlatforms,
        updateGenres,
      ]);

      // Mostrar lo que se modificó después de las actualizaciones
      res.status(200).json({
        message: 'Actualizaciones completadas exitosamente',
        updatedProduct: product,
      });
    } catch (error) {
      console.error('Error al realizar las actualizaciones:', error);
      // Manejar el error y enviar una respuesta adecuada
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  destroy: (req, res) => {
    db.VideoGame.destroy({
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
  listGenres: (req, res) => {
    db.Genre.findAll().then((genres) => {
      let respuesta = {
        meta: {
          status: 200,
          url: '/genres/list',
        },
        data: genres,
      };
      res.json(respuesta);
    });
  },
  listPlataforms: (req, res) => {
    db.Platform.findAll().then((plataforms) => {
      let respuesta = {
        meta: {
          status: 200,
          url: '/platforms/list',
        },
        data: plataforms,
      };
      res.json(respuesta);
    });
  },
};
