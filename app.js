const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const productRouter = require('./productRouter');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const products = [
  { id: 1, name: 'Товар 1', price: 10, stock: 10 },
  { id: 2, name: 'Товар 2', price: 20, stock: 5 },
  { id: 3, name: 'Товар 3', price: 30, stock: 8 },
];

const cart = [];

app.use(productRouter);

app.get('/', (req, res) => {
  res.render('index', { cart: cart, products: products });
});

app.post('/api/cart/add', (req, res) => {
  const productId = req.body.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Товар не знайдено.' });
  }

  if (product.stock > 0) {
    cart.push({ ...product });
    product.stock--;
    res.json({ message: 'Товар додано до корзини.' });
  } else {
    res.status(400).json({ message: 'Товар на складі закінчився.' });
  }
});

app.post('/api/cart/remove', (req, res) => {
  const productId = req.body.productId;
  const productIndex = cart.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Товар не знайдено в корзині.' });
  }

  const removedProduct = cart.splice(productIndex, 1)[0];
  const originalProduct = products.find((p) => p.id === removedProduct.id);
  originalProduct.stock++;
  res.json({ message: 'Товар видалено з корзини.' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
