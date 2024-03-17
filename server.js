require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const BLOG = require('./models/blog');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    // Start the server after successful connection
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

// Call the connectDB function
connectDB()
  .then((res) => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', 'views')

// Routes
app.post('/add-blog', async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const save = new BLOG({
      title: title,
      author: author,
      description: description,
    });
    console.log('Data received:', req.body);
    await save.save();
    res.status(201).send('Blog post created successfully');
  } catch (err) {
    console.error('Error adding blog post:', err);
    res.status(500).send('Internal server error');
  }
});

app.get('/', async (req, res) => {
  try {
    const data = await BLOG.find();
    const blogs = data.map(blog => ({
      title: blog.title,
      author: blog.author,
      description: blog.description,
      time: blog.createdAt
    }));
    res.render('index', { title: 'Home', blogs });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send('Internal server error');
    res.send(morgan('dev'))
  }
});

app.get('/about', async (req, res) => {
  try{
    res.render('about', { title: 'About' });
  }
  catch(err){
    console.log(err, 'Internal error')
  }
});

app.get('/create', (req, res) => {
  res.render('create', { title: 'New Blog' });
});

app.use((req, res) => {
  res.render('404', { title: '404' });
});

module.exports = app;
