const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');

function renderProducts() {
  fetch('/api/products', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((products) => {
      productsDiv.innerHTML = '';

      const ul = document.createElement('ul');
      products.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${product.name}</span>
          <span>${product.price}</span>
          <button onclick="addToCart(${product.id})">Додати до корзини</button>
        `;
        ul.appendChild(li);
      });

      productsDiv.appendChild(ul);
    })
    .catch((error) => console.error('Помилка:', error));
}

function renderCart() {
  fetch('/api/cart', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((cart) => {
      cartDiv.innerHTML = '';

      const ul = document.createElement('ul');
      cart.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.name}</span>
          <span>${item.price}</span>
          <button onclick="removeFromCart(${item.id})">Видалити з корзини</button>
        `;
        ul.appendChild(li);
      });

      cartDiv.appendChild(ul);
    })
    .catch((error) => console.error('Помилка:', error));
}

function addToCart(productId) {
  console.log(`Спроба додати товар до корзини з ID ${productId}`);
  fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: productId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Відповідь від сервера:', data);
      if (data.message === 'Товар додано до корзини.') {
        console.log(data.message);
        renderCart();
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error('Помилка:', error));
}

function removeFromCart(productId) {
  fetch('/api/cart/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: productId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Товар видалено з корзини.') {
        console.log(data.message);
        renderCart();
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error('Помилка:', error));
}

renderProducts();
renderCart();

function validateAndConvertParams(req, res, next) {
  if (req.params.id) {
    req.params.id = parseInt(req.params.id);
  }
  if (req.query.price) {
    req.query.price = parseFloat(req.query.price);
  }

  next();
}