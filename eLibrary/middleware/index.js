var Book       = require("../models/book");
var Comment    = require("../models/comment");

// all the middleware goes here 
var middlewareObj = {};

middlewareObj.checkBookOwnerShip = function(req, res, next){
        //is user logged in?
        if(req.isAuthenticated()){        
          Book.findById(req.params.id, function(err, foundBook){
              if(err){
                  req.flash("error", "Book not found");
                  res.redirect("back");
              }else{
                  //DOES THE USER OWN THE Book? 
                  if(foundBook.author.id.equals(req.user._id)){
                      next();
                  } else {
                      req.flash("error", "You don't have permission to do that!");
                      res.redirect("back");
  
                  }    
              }
          });
  
      }else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
      }
    }


middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){        
      Comment.findById(req.params.comment_id, function(err, foundcomment){
          if(err){
              res.redirect("back");
          }else{
              //DOES THE USER OWN THE COMMENT? 
              if(foundcomment.author.id.equals(req.user._id)){
                  next();
              } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back")

              }    
          }
      });

  }else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}


//Middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;