const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const accessToken = generateAccessToken(user);
        res.status(200).json({ accessToken });

    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
}

exports.signup = async (req, res) => {
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

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        console.log('User created successfully');
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.log("signup:", error.message);
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

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        console.log('User logged in successfully');
        res.status(200).json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error in Login');
    }
};
