const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email , password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return user.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('User created successfully');
        res.status(200).json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error in signup');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne( { email });

        if (!user)
            return res.status(400).json({ message: 'User does not exist' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('User logged in successfully');
        res.status(200).json({ token });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error in Login');
    }
};
