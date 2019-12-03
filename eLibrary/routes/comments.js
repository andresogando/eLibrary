var express = require("express");
var router  = express.Router({mergeParams: true});
var Book = require("../models/book");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");


//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find Book by id
    console.log(req.params.id);
    Book.findById(req.params.id, function(err, Book){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {Book: Book});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup Book using ID
   Book.findById(req.params.id, function(err, Book){
       if(err){
           console.log(err);
           res.redirect("/Books");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
            req.flash("error", "Something went wrong!");
            console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               Book.comments.push(comment);
               Book.save();
               console.log(comment);
               req.flash("success", "Successfully added comment!")
               res.redirect('/Books/' + Book._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {Book_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/Books/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
        req.flash("success", "Comment Deleted!");
        res.redirect("/Books/" + req.params.id);
       }
    });
});

module.exports = router;
