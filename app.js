const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middlewares/verifyToken');
const User = require('./models/User');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'This is a private route', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
