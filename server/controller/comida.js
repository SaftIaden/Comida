import { dBgetMeals, dBdeleteMeal, dBpostImage, dBpostMeal, dBgetMealbByID, dBpatchMeal } from '../models/comida.js';

const getMeals = async (req, res) => {
  const meals = await dBgetMeals();
  res.status(200).json(meals);
};

const deleteMeal = async (req, res) => {
  const { mid } = req.params;
  const meal = await dBgetMealbByID(mid);
  if (!meal) res.status(404).send('Meal not found!');
  await dBdeleteMeal(mid);
  res.status(200).json(meal);
};

const postMeal = async (req, res) => {
  const { name, descriptiopn, price } = req.body;
  if (!meal || !descriptiopn || !price) res.status(500).send('Too few arguments!');
  const meal = await dBpostMeal(name, descriptiopn, price);
  res.status(200).json(meal);
};

const patchMeal = async (req, res) => {
  const { name, description, price } = req.body;
  const { mid } = req.params;
  const meal = await dBgetMealbByID(mid);
  if (!meal) res.status(404).send('Meal not found!');
  const updatedMeal = await dBpatchMeal(name, description, price, mid);
  res.status(200).json(updatedMeal);
};
