require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the MindWell backend!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
