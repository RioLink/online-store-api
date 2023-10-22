const products = [
    { id: 1, name: 'Товар 1', price: 10, stock: 10 },
    { id: 2, name: 'Товар 2', price: 20, stock: 5 },
    { id: 3, name: 'Товар 3', price: 30, stock: 8 },
  ];
  
  // Отримати всі товари
  exports.getProducts = (req, res) => {
    const { name, price } = req.query;
    let filteredProducts = products;
  
    if (name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  
    if (price) {
      filteredProducts = filteredProducts.filter((product) =>
        product.price <= price
      );
    }
  
    res.json(filteredProducts);
  };
  
  // Отримати товар за ID
  exports.getProductById = (req, res) => {
    const productId = req.params.id;
    const product = products.find((p) => p.id === productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Товар не знайдено' });
    }
  };
  
  // Додати товар до корзини
  exports.addToCart = (req, res) => {
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
  };
  
  // Видалити товар з корзини
  exports.removeFromCart = (req, res) => {
    const productId = req.body.productId;
    const productIndex = cart.findIndex((p) => p.id === productId);
  
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Товар не знайдено в корзині.' });
    }
  
    const removedProduct = cart.splice(productIndex, 1)[0];
    const originalProduct = products.find((p) => p.id === removedProduct.id);
    originalProduct.stock++;
    res.json({ message: 'Товар видалено з корзини.' });
  };