const Category = require('../models/category');
const slugify = require('slugify'); // new table
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

/*
return res.status(400).json({
error: errorHandler(err)});
ouput:
"error": "11000 duplicate key error collection: test.categories index: slug already exists"
*/