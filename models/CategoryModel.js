var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    description: String
  }
);

var CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;