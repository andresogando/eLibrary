//Setting Up Express, Mongoose, etc. . . 
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methoOverride   = require("method-override"),
    Books           = require("./models/book"),
    Comment         = require("./models/comment"),
    //seedDB          = require("./seeds"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    moment          = require('moment')

    //requering routes
var commentRoutes    = require("./routes/comments"),
    booksRoutes      = require("./routes/books"),
    indexRoutes      = require("./routes/index")

    //process.env.DATABASEURL
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useCreateIndex: true
    }).then(() => {
        console.log('connected to DB!');
    }).catch(err => {
        console.log('ERROR', err.message);
    });

//require moments!
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methoOverride("_method"));
app.use(flash());

//seedDB();  //seed the database
 
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "andres",
    resave: false,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/books", booksRoutes);
app.use("/books/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP,   function(){
    console.log("The eLibrary Server Has Started!");
 });
 

 //process.env.PORT, process.env.IP, 