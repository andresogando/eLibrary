var  express      = require("express");
var  router       = express.Router();
var  Book          = require("../models/book");
var  middleware   = require("../middleware/index");



    //INDEX - show all Books
    router.get("/", middleware.isLoggedIn,function(req, res){
    // Get all Books from DB
    Book.find({}, function(err, allBooks){
       if(err){
           console.log(err);
       } else {
          res.render("books/index",{Books:allBooks});
       }
    });
});

//CREATE - add new Book to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to Books array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBook = {name: name, image: image, description: desc, author: author, price:price}
    // Create a new Book and save to DB
    Book.create(newBook, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to Books page
            res.redirect("/Books");
        }
    });
});

//NEW - show form to create new Book
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("Books/new"); 
});

// SHOW - shows more info about one Book
router.get("/:id", function(req, res){
    //find the Book with provided ID
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
        if(err){
            console.log(err);
        } else {
            console.log(foundBook)
            //render show template with that Book
            res.render("Books/show", {Book: foundBook});
        }
    });
});

// EDIT Book ROUTE
router.get("/:id/edit", middleware.checkBookOwnerShip, function(req, res){ 
        Book.findById(req.params.id, function(err, foundBook){
            res.render("Books/edit", {Book: foundBook});
        });
});

// UPDATE Book ROUTE 
router.put("/:id",middleware.checkBookOwnerShip, function(req, res){
    //find and update the correct Book
    
    Book.findByIdAndUpdate(req.params.id, req.body.Book, function(err, updatedBook){
        if(err){
            res.redirect("/Books");
        }else{
            res.redirect("/Books/" + req.params.id);
        }
    }); 
    //redirect somewhere(show page)
})

// DESTROY Book ROUTE
router.delete("/:id",middleware.checkBookOwnerShip, function(req, res){
    Book.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/Books");

        }else {
            res.redirect("/Books");

        }
    });
});


module.exports = router;