const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

// Sync database
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
