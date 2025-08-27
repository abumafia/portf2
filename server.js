const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB ulanish
mongoose.connect('mongodb+srv://refbot:refbot00@gamepaymentbot.ffcsj5v.mongodb.net/portf2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modellar
const PortfolioSchema = new mongoose.Schema({
  siteTitle: String,
  favicon: String,
  personName: String,
  personBio: String,
  services: [{
    name: String,
    price: Number,
    description: String
  }],
  socialMedia: [{
    platform: String,
    url: String
  }],
  gallery: [{
    title: String,
    imageUrl: String,
    category: String
  }]
});

const OrderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  customerName: String,
  customerContact: String,
  screenshot: String,
  telegramUsername: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
const Order = mongoose.model('Order', OrderSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routelar
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API routelari
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await Portfolio.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      portfolio.set(req.body);
    }
    await portfolio.save();
    res.json({ message: 'Maʼlumotlar saqlandi!', data: portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Bu yerda Telegram bot orqali xabar yuborish funksiyasini qo'shishingiz mumkin
    // sendTelegramMessage(order);
    
    res.json({ message: 'Buyurtma qabul qilindi!', data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/order/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Buyurtma yangilandi!', data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server ${port}-portda ishga tushdi`);
});