const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

// Налаштування PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);

// Налаштування EJS
app.engine('ejs', require('ejs').renderFile);

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));
// Відправлення favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Маршрути
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// Обробник для кореневого маршруту
app.get('/', (req, res) => {
  res.render('home');
});
// Використання cookie-parser
app.use(cookieParser());

// Маршрут для збереження улюбленої теми
app.get('/set-theme/:theme', (req, res) => {
  const { theme } = req.params;
  res.cookie('theme', theme, { maxAge: 900000, httpOnly: true }); // maxAge вказує термін дії cookie у мілісекундах
  res.send('Theme set successfully');
});
// Маршрут для реєстрації
app.post('/register', (req, res) => {
  // Логіка реєстрації користувача
  // Після успішної реєстрації
  const userId = 'user_id'; // Ідентифікатор користувача, який ви можете отримати під час реєстрації
  const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.send('Registration successful');
});

// Маршрут для входу
app.post('/login', (req, res) => {
  // Логіка входу користувача
  // Після успішного входу
  const userId = 'user_id'; // Ідентифікатор користувача, який ви можете отримати під час входу
  const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.send('Login successful');
});

// Мідлвар для перевірки JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).send('Invalid token');
  }
};

// Захищені маршрути
app.get('/protected-route', verifyToken, (req, res) => {
  res.send('Protected route');
});
// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
