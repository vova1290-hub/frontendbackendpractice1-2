const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Ноутбук', price: 1000 },
  { id: 2, name: 'Смартфон', price: 700 },
  { id: 3, name: 'Планшет', price: 500 },
  { id: 4, name: 'Наушники', price: 250 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Укажите name и price' });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price)
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const { name, price } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price);

  res.json(product);
});

app.delete('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  products.splice(index, 1);

  res.json({ message: 'Товар удалён' });
});

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});