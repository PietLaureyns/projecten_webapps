var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Gebruiker = mongoose.model('Gebruiker');
let Reactie = mongoose.model('Reactie');
let Blog = mongoose.model('Blog');

/*POST Reactie to Blog*/
/*GET Reacties of Blog*/

/*GET Blogs zonder reacties*/
router.get('/blogs', function (req, res, next) {
  Blog.find({},
    function(err, blogs) {
      res.send(blogs);
    });
});

/*GET Full Blog*/
router.get('/blog/:id', function (req, res, next) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) return next(err);
    res.send(blog);
   }).populate("reacties");
});

/*POST Blog*/
router.post('/blogs', function (req, res, next) {
  let blog = new Blog(req.body.blog);

  blog.save(function(err, postedBlog) {
    if (err) { return next(err); }
    res.json(postedBlog);
  });
});

/*POST Reactie*/
router.post('/reactie/:blogId', function (req, res, next) {
  let reactie = new Reactie(req.body.reactie);
  Blog.findByIdAndUpdate(req.params.blogId, { $push: { reacties: reactie._id } }, function (err, blog) {
    if (err) return next(err);
  });
  reactie.save(function (err, newReactie) {
    if (err) { return next(err); }
    return res.json(newReactie);
  });

});

module.exports = router;
