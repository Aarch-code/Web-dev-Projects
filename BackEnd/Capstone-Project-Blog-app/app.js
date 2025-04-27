import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // In-memory post storage

// Home - list all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Create new post
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  posts.push({ id, title, content });
  res.redirect('/');
});

// Edit post page
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

// Handle edit
app.post('/update/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
