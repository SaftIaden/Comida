import { query } from '../src/db/index.js';

async function dBgetMeals() {
  const { rows } = await query('select * from meals join meal_images mi on meals.id = mi.meal_id;');
  return rows;
}

async function dBdeleteMeal(m_id) {
  const { rows } = await query('DELETE FROM meals where m_id = $1 returning *', [m_id]);
  return rows[0];
}

async function dBgetMealbByID(m_id) {
  const { rows } = await query('select * FROM meals where m_id = $1', [m_id]);
  return rows[0];
}

async function dBpostImage(meal_id, imageData) {
  const { rows } = await query('INSERT INTO meal_images (meal_id, image) VALUES ($1, $2) returning *', [meal_id, imageData]);
  return rows[0];
}
async function dBpostMeal(name, description, price) {
  const { rows } = await query('INSERT INTO meals (name,description,price) VALUES ($1, $2,$3) returning *', [name, description, price]);
  return rows[0];
}

async function dBpatchMeal(name, description, price, mid) {
  const { rows } = await query('UPDATE meals SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING *', [name, description, price, mid]);
  return rows[0];
}

export { dBgetMeals, dBdeleteMeal, dBpostImage, dBpostMeal, dBgetMealbByID, dBpatchMeal };
