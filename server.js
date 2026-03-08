const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory "database" of users for learning purposes.
// In a real app, you'd use a database like Postgres or MongoDB.
const users = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'dev-secret-change-me', // For learning only. Use an env var in real apps.
    resave: false,
    saveUninitialized: false
  })
);

function requireAuth(req, res, next) {
  if (!req.session || !req.session.username) {
    return res.redirect('/login');
  }
  next();
}

app.get('/', (req, res) => {
  if (req.session && req.session.username) {
    return res.redirect('/home');
  }
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  if (req.session && req.session.username) {
    return res.redirect('/home');
  }
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).render('login', { error: 'Invalid username or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).render('login', { error: 'Invalid username or password.' });
  }

  req.session.username = user.username;
  res.redirect('/home');
});

app.get('/register', (req, res) => {
  if (req.session && req.session.username) {
    return res.redirect('/home');
  }
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).render('register', { error: 'Username and password are required.' });
  }

  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.status(400).render('register', { error: 'Username is already taken.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });

  req.session.username = username;
  res.redirect('/home');
});

app.get('/home', requireAuth, (req, res) => {
  res.render('home', { username: req.session.username });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

