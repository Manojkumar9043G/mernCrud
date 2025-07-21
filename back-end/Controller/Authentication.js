const User = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: "Some details are missing" });
    }

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(400).json({ success: false, msg: "This email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({ success: true, msg: "Your data saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: `Error creating user: ${error}`, success: false });
  }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({
                success: false,
                message: "Email is not registered"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);



        if (isMatch) {

            const token = jwt.sign(
                {id : user._id,email: user.email},
                process.env.JWT_SECRET_KEY,
                { expiresIn : process.env.JWT_EXPIRE}
            );

            return res.status(200).json({
                success: true,
                message: "Login successfully",
                userToken : token
            });
            
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `Server error: ${error}`
        });
    }
};
