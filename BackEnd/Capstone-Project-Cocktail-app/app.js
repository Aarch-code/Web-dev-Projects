import express from 'express';
import axios from 'axios';
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cocktail', async (req, res) => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const drink = response.data.drinks[0];
    res.render('result', { drink });
  } catch (error) {
    console.error(error.message);
    res.send("Oops! Something went wrong.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
