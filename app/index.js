const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 메모리 내 데이터 저장소
let products = [
  { id: 1, name: 'Product 1', price: 100, description: 'Description for product 1' },
  { id: 2, name: 'Product 2', price: 200, description: 'Description for product 2' },
  { id: 3, name: 'Product 3', price: 300, description: 'Description for product 3' },
  { id: 4, name: 'Product 4', price: 400, description: 'Description for product 4' },
  { id: 5, name: 'Product 5', price: 500, description: 'Description for product 5' },
];

// 상품 CRUD API
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  const product = {
    id: products.length + 1,
    name,
    price,
    description: description || '',
  };
  products.push(product);
  res.status(201).json({ message: 'Product created successfully', product });
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name, price, description } = req.body;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price || products[productIndex].price,
    description: description || products[productIndex].description,
  };

  products[productIndex] = updatedProduct;
  res.json({ message: 'Product updated successfully', product: updatedProduct });
});

app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
