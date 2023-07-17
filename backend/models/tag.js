const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    slug: {
      type: String,
      unique: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tag', tagSchema);

/*
tag working direction or category as the same..
tag create list read delete
1. model
2. validator
3. routes
4. apply as middleware in server.js
5. controllers
*/