const User = require(`../models/userModel`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const {registerValidation, loginValidation} = require(`../utils/validation`);

const signUp = async (req, res, next) => {
    //validation
    const {error} = registerValidation(req.body);
    if(error) return res.send(error.details[0].message);
    
    //check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return  res.status(400).send("Email already exists");
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role 
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
};


const signIn = async(req, res, next) => {
    const {email, password} = req.body;

    //validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user is admin
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ role: 'admin', message: "Admin Auth successful", token });
    }

    //check if the user exist
    const user = await User.findOne({email}).lean();
    if(!user) return res.status(400).send("Email doesn't exist");

    // Check password
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) return res.status(400).send("Invalid password");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Auth successful", ...user, token });
}

module.exports = {
    signIn,
    signUp
};