const User = require("../models/user.js");



module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup = async(req,res)=>{
    try{
        let {username, email, password, phone, community, location, role} = req.body;
        const newUser = new User({username, email, phone}); //creating newUser obj with User method
        const registeredUser = await User.register(newUser, password); //saving in db using register method
        // console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success", "Welcome to Ai Nexus !");
            res.redirect("/home");
        })
        
    }catch(err){
        req.flash("error", err.message)
        res.redirect("/signup");
    }
};




module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{ //passport.authenticate is a default middleware provided by the passport package itself , which use to authentication before login
    req.flash("success","Welcome back to Ai Nexus !");
    let redirectUrl = res.locals.redirectUrl || "/home";
    res.redirect(redirectUrl);
};




module.exports.logout = (req,res, next)=>{
    req.logout((err)=>{//"req.logout" is default method created by the passport which help us to delete user info from the sessions
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out now !");
        res.redirect("/home");
    }) 
};




module.exports.toggleSaveListing = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the currently logged-in user
        const user = await User.findById(req.user._id);

        // Check if the tool is already in their saved array
        if (user.savedListings.includes(id)) {
            // If yes, remove it (Unsave)
            user.savedListings.pull(id);
            await user.save();
            return res.json({ success: true, isSaved: false, message: "Removed from your stack" });
        } else {
            // If no, add it (Save)
            user.savedListings.push(id);
            await user.save();
            return res.json({ success: true, isSaved: true, message: "Added to your stack" });
        }
    } catch (err) {
        console.error("Error toggling save:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};