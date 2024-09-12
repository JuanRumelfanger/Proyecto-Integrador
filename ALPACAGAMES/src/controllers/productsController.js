const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const { Op } = require("sequelize");

const productsController = {
  listProducts: (req, res) => {
    db.VideoGame.findAll({
      include: [
        {
          model: db.VideoGameDetail,
          as: "details",
          attributes: ["description", "images"],
        },
        {
          model: db.Platform,
          as: "platforms",
          attributes: ["name"],
        },
        {
          model: db.Genre,
          as: "genres",
          attributes: ["name"],
        },
      ],
    }).then((products) => {
      res.render("productsList", { products });
    });
  },
  productsDetail: async (req, res) => {
    try {
      const product = await db.VideoGame.findByPk(req.params.id, {
        include: [
          {
            model: db.VideoGameDetail,
            as: "details",
          },
          {
            model: db.Platform,
            as: "platforms",
            attributes: ["name"],
          },
          {
            model: db.Genre,
            as: "genres",
            attributes: ["name"],
          },
        ],
        distinct: "id",
      });
      res.render("productDetail", { product });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  create: (req, res) => {
    res.render("crearProducto");
  },
  store: async (req, res) => {
    const imagePath = req.file.path;

    try {
      const videoGameInstance = await db.VideoGame.create(
        {
          price: req.body.price,
          name: req.body.name,
          release_date: req.body.releaseDate,
          details: {
            description: req.body.description,
            size: req.body.downloadSize,
            images: imagePath.slice(11),
            requiments: {
              os: req.body.os,
              storage: req.body.storage,
            },
          },
        },
        {
          include: [{ model: db.VideoGameDetail, as: "details" }],
        }
      );

      let platforms;
      if (typeof req.body.platforms === "string") {
        const [platform] = await db.Platform.findOrCreate({
          where: { name: req.body.platforms },
        });
        platforms = [platform];
      } else {
        const platformPromises = req.body.platforms.map((name) =>
          db.Platform.findOrCreate({ where: { name } }).then(
            ([platform]) => platform
          )
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

      console.log("Video game, details and platforms created successfully");
      res.redirect("/products");
    } catch (error) {
      console.error("Error:", error);
    }
  },
  /*
    newProduct = {
      id: products.length + 1,
      name: req.body.name,
      description: req.body.description,
      platforms: req.body.plataforms,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      price: +req.body.price,
      images: req.body.images,
      systemReq: req.body.systemReq,
      downloadSize: req.body.downloadSize,
    };
    products.push(newProduct);
    updateJSON();
    res.redirect('/products/' + newProduct.id);
    
    const imageFilename = req.file ? req.file.filename : null;
    const selectedPlatforms = Array.isArray(req.body.platforms)
      ? req.body.platforms
      : [req.body.platforms];
    const lastProductId = products[products.length - 1].id;

    const newProduct = {
      id: lastProductId + 1,
      name: req.body.name,
      description: req.body.description,
      platforms: selectedPlatforms,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      price: parseFloat(req.body.price),
      images: imageFilename,
      systemReq: { os: req.body.os, storage: req.body.storage },
      downloadSize: Number(req.body.downloadSize),
    };
    //newProduct.id = lastProductId + 1;

    //newProduct.platforms = selectedPlatforms;
    //newProduct.images = imageFilename;
    products.push(newProduct);
    updateJSON();
    res.redirect('/products/');*/

  edit: async (req, res) => {
    try {
      const product = await db.VideoGame.findByPk(req.params.id, {
        include: [
          {
            model: db.VideoGameDetail,
            as: "details",
          },
          {
            model: db.Platform,
            as: "platforms",
            attributes: ["name"],
          },
          {
            model: db.Genre,
            as: "genres",
            attributes: ["name"],
          },
        ],
      });
      res.render("editarProducto", { product });
    } catch (error) {
      console.error("Error:", error);
    }
  },
  update: async (req, res) => {
    try {
      const product = await db.VideoGame.findByPk(req.params.id);
      if (!product) {
        return res.status(404).send("Product not found");
      }

      await product.update({
        price: req.body.price,
        name: req.body.name,
        release_date: req.body.release_date,
      });

      const detailsData = req.body.details;
      const platformsData = req.body.platforms;
      const genresData = req.body.genres;

      const update = [];

      if (detailsData) {
        const details = await db.VideoGameDetail.bulkCreate(detailsData);
        update.push(product.setDetails(details));
      }

      if (platformsData) {
        const platforms = await db.Platform.bulkCreate(
          platformsData.map((name) => ({ name }))
        );
        update.push(product.setPlatforms(platforms));
      }

      if (genresData) {
        const genres = await db.Genre.bulkCreate(
          genresData.map((name) => ({ name }))
        );
        update.push(product.setGenres(genres));
      }

      await Promise.all(update);

      res.redirect("/products/" + req.params.id);
    } catch (error) {
      console.error("Error:", error);
    }
  },
  destroy: async (req, res) => {
    try {
      const videoGameDetail = await db.VideoGameDetail.findOne({
        where: { video_game_id: req.params.id },
      });
      if (videoGameDetail) {
        await videoGameDetail.destroy();
      }

      const product = await db.VideoGame.findByPk(req.params.id);
      if (!product) {
        return res.status(404).send("Product not found");
      }

      await product.destroy();

      res.redirect("/products");
    } catch (error) {
      console.error("Error:", error);
    }
  },
  search: async (req, res) => {
    const videoGames = await db.VideoGame.findAll({
      include: [
        {
          model: db.VideoGameDetail,
          as: "details",
          attributes: ["description", "images"],
        },
        {
          model: db.Platform,
          as: "platforms",
          attributes: ["name"],
        },
        {
          model: db.Genre,
          as: "genres",
          attributes: ["name"],
        },
      ],
      where: {
        name: { [Op.like]: "%" + req.query.search + "%" },
      },
    })
      res.render('productsList', { products: videoGames });
    
  },
};

module.exports = productsController;
