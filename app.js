const express = require('express');
const app = express();
const port = 3000;
const { connectDB } = require('./connection');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);


connectDB('mongodb://localhost/authentication')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
