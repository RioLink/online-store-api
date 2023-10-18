const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');

// Функція для відображення товарів
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

// Функція для відображення корзини
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

// Функція для додавання товару до корзини
function addToCart(productId) {
  fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: productId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Товар додано до корзини.') {
        console.log(data.message);
        renderCart();
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error('Помилка:', error));
}


// Функція для видалення товару з корзини
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