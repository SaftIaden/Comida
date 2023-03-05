import { dBgetMeals, dBgetLikedMeals, dBdeleteMeal, dBpostMeal, dBgetMealbByID, dBpatchMeal, dBdislikeMeal, dBlikeMeal } from '../models/comida.js';

const getMeals = async (req, res) => {
  const meals = await dBgetMeals();
  res.status(200).json(meals);
};

const getLikedMeals = async (req, res) => {
  const meals = await dBgetLikedMeals();
  res.status(200).json(meals);
};

const deleteMeal = async (req, res) => {
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  await dBdeleteMeal(id);
  res.status(200).json(meal);
};

const likeMeal = async (req, res) => {
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  await dBlikeMeal(id);
  res.status(200).json(meal);
};

const dislikeMeal = async (req, res) => {
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  await dBdislikeMeal(id);
  res.status(200).json(meal);
};

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

const patchMeal = async (req, res) => {
  const { name, description, price } = req.body;
  const { id } = req.params;
  const meal = await dBgetMealbByID(id);
  if (!meal) res.status(404).send('Meal not found!');
  const updatedMeal = await dBpatchMeal(name, description, price, id);
  res.status(200).json(updatedMeal);
};

export { getMeals, getLikedMeals, deleteMeal, patchMeal, postMeal, dislikeMeal, likeMeal };
