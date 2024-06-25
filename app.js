const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

let products = [];

app.get('/', (req, res) => {
    res.render('index', { products, errorMessage: null });
});

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    if (name && !isNaN(price)) {
        products.push({ name, price: parseFloat(price) });
        res.redirect('/');
    } else {
        res.render('index', { products, errorMessage: 'Incorrect input' });
    }
});

app.use((req, res, next) => {
    res.status(404).render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
