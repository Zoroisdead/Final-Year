const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes'); // Import user routes
// const bikeRoutes = require('./routes/BikeRoutes');
const dotenv = require('dotenv');
const checkoutRoutes = require('./routes/CheckoutRoutes')
const app = express();
const port = process.env.PORT || 5000;
const paymentRoutes = require('./routes/paymentRoutes'); // Import routes app.use(bodyParser.urlencoded({ extended: false })); app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json()); // To parse incoming JSON data
app.use(paymentRoutes);
// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/checkout', checkoutRoutes);
// app.use('/api/bike', bikeRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
