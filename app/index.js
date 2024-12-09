const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8080;
const JWT_SECRET = 'your_jwt_secret_key'; // JWT 비밀 키 (환경 변수로 설정 권장)

// MongoDB Atlas 연결 설정
const uri = "mongodb+srv://dongseoultech:shin1625@cluster0.xfadl.mongodb.net/";
const client = new MongoClient(uri);

// MongoDB 데이터베이스와 컬렉션
let productsCollection;
let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    const database = client.db("project");
    productsCollection = database.collection("products");
    usersCollection = database.collection("users");
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas", err);
    process.exit(1);
  }
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT 인증 미들웨어
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 회원가입 API
async function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) return res.status(409).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
}

// 로그인 API
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to log in', error: err.message });
  }
}

// 상품 CRUD API
app.post('/products', authenticateJWT, async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

  try {
    const result = await productsCollection.insertOne({
      name,
      price,
      description,
      ownerId: req.user.userId, // 상품 작성자의 사용자 ID 저장
    });
    res.status(201).json({ message: 'Product created successfully', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
});

app.get('/products', authenticateJWT, async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

app.put('/products/:id', authenticateJWT, async (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;

  try {
    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.ownerId !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });

    const result = await productsCollection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: { name, price, description } },
      { returnDocument: 'after' }
    );

    res.json({ message: 'Product updated successfully', product: result.value });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});

app.delete('/products/:id', authenticateJWT, async (req, res) => {
  const productId = req.params.id;
  console.log(req.params);

  try {
    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.ownerId !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });

    const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});

// 회원가입 및 로그인 API 라우트 등록
app.post('/register', registerUser);
app.post('/login', loginUser);

// 서버 시작
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
