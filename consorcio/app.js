require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const consorcioRoutes = require('./routes/consorcioRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/consorcios', consorcioRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Backend rodando na porta 5000'));