const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/tag')
const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const fs = require('fs')
const { errorHandler } = require('../helpers/dbErrorHandler')


exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not upload!'
      })
    }

    const { title, body, categories, tags } = fields

    if (!title || !title.length) {
      return res.status(400).json({
        error: 'title is required'
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: 'Content is too short'
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: 'At least one category is required'
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: 'At least one tag is required'
      });
    }

    let blog = new Blog()
    blog.title = title
    blog.body = body
    blog.slug = slugify(title).toLowerCase() // replace with dash -
    blog.mtitle = `${title} | ${process.env.APP_NAME}`
    blog.mdesc = stripHtml(body.toString().substring(0, 160))
    blog.postedBy = req.user._id

    // categories and tags
    let arrayOfCategories = categories && categories.split(',');
    let arrayOfTags = tags && tags.split(',');


    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less then 1mb in size!'
        })
      }
      blog.photo.data = fs.readFileSync(files.photo.filepath)
      blog.photo.contentType = files.photo.mimetype;
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      // res.json(result);
      Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
        (err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            });
          } else {
            Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
              (err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: errorHandler(err)
                  });
                } else {
                  res.json(result);
                }
              }
            );
          }
        }
      );

    })
  })
}

/* library string-strip-html untuk versi update sudah menggunakan ES 6 Module   
   jika saya menggunakan versi update maka saya harus
   setting kembali ke es 6 module dari 0 untuk komponent komponent yang lain
   better saya turunkan versi string-strip-html
*/