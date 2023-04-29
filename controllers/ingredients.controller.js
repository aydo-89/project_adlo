const db = require("../middlewares");
const Ingredients = db.ingredients;

// Retrieve all ingredients
exports.getAllIngredients = (req, res) => {
  Ingredients.findAll()
    .then((ingredients) => {
      res.status(200).send(ingredients);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Retrieve a single ingredient by id
exports.getIngredientById = (req, res) => {
  const id = req.params.id;

  Ingredients.findByPk(id)
    .then((ingredient) => {
      if (!ingredient) {
        res.status(404).send({ message: "Ingredient not found" });
      } else {
        res.status(200).send(ingredient);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Create a new ingredient
exports.createIngredient = (req, res) => {
  const { name, description, price } = req.body;

  // Validate request
  if (!name || !price) {
    res.status(400).send({
      message: "Name and price are required",
    });
    return;
  }

  const ingredient = {
    name: name,
    description: description,
    price: price,
  };

  // Save ingredient in the database
  Ingredients.create(ingredient)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Update an ingredient by id
exports.updateIngredient = (req, res) => {
  const id = req.params.id;

  Ingredients.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({ message: "Ingredient updated successfully" });
      } else {
        res.status(404).send({ message: "Ingredient not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Delete an ingredient by id
exports.deleteIngredient = (req, res) => {
  const id = req.params.id;

  Ingredients.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({ message: "Ingredient deleted successfully" });
      } else {
        res.status(404).send({ message: "Ingredient not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
