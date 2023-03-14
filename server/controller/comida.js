// importing database methods from comida.js file
import { dBgetMeals, dBgetLikedMeals, dBdeleteMeal, dBpostMeal, dBgetMealbByID, dBpatchMeal, dBdislikeMeal, dBlikeMeal } from '../models/comida.js';

// function to get all meals from the database and send the response as JSON object
const getMeals = async (req, res) => {
  const meals = await dBgetMeals();
  res.status(200).json(meals);
};

// function to get all liked meals from the database and send the response as JSON object
const getLikedMeals = async (req, res) => {
  const meals = await dBgetLikedMeals();
  res.status(200).json(meals);
};

// function to delete a meal from the database by id and send the deleted meal as JSON object
const deleteMeal = async (req, res) => {
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  await dBdeleteMeal(id);
  res.status(200).json(meal);
};

// function to like a meal by id and send the liked meal as JSON object
const likeMeal = async (req, res) => {
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  await dBlikeMeal(id);
  res.status(200).json(meal);
};

// function to dislike a meal by id and send the disliked meal as JSON object
const dislikeMeal = async (req, res) => {
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  await dBdislikeMeal(id);
  res.status(200).json(meal);
};

// function to create a new meal in the database with name, description,
// price, and image as fields from request body
// and send the created meal as JSON object
const postMeal = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file.buffer;
  if (!name || !description || !price || !image) {
    res.status(400).send('Missing required fields');
    return;
  }
  const meal = await dBpostMeal(name, description, price, image);
  res.status(200).json(meal);
};

// function to update an existing meal in the database by id with provided name,
// description, and price from request body
// and send the updated meal as JSON object
const checkIfMealExists = async (id) => {
  const meal = await dBgetMealbByID(id);
  if (!meal) throw new Error('Meal not found!');
};

const patchMeal = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { id } = req.params;

    await checkIfMealExists(id);

    const updatedMeal = await dBpatchMeal(name, description, price, id);

    res.status(200).json(updatedMeal);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// exporting all functions to be used in other files
export { getMeals, getLikedMeals, deleteMeal, patchMeal, postMeal, dislikeMeal, likeMeal };
