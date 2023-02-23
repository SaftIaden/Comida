import { query } from '../src/db/index.js';

async function getMeals() {
  const { rows } = await query('select * from meals join meal_images mi on meals.id = mi.meal_id;');
  return rows;
}

async function deleteMeal(m_id) {
  const { rows } = await query('DELETE FROM meals where m_id = $1', [m_id]);
  return rows;
}

async function postImage(meal_id, imageData) {
  const { rows } = await query('INSERT INTO meal_images (meal_id, image) VALUES ($1, $2)', [
    meal_id,
    imageData,
  ]);
  return rows;
}
async function postMeal(name, description, price) {
  const { rows } = await query('INSERT INTO meals (name,description,price) VALUES ($1, $2,$3)', [
    name,
    description,
    price,
  ]);
}

export { getMeals, deleteMeal, postImage };
