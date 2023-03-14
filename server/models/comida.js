/* eslint-disable max-len */
/* eslint-disable camelcase */
import { query } from '../src/db/index.js';

async function dBgetMeals() {
  return (await query('select * from meals order by created_at desc;')).rows;
}

async function dBgetLikedMeals() {
  const { rows } = await query('select * from meals group by id,name, description, price, likes having likes > 0 order by likes desc;');
  return rows;
}

async function dBdeleteMeal(id) {
  const { rows } = await query('DELETE FROM meals where id = $1 returning *', [id]);
  return rows[0];
}

async function dBgetMealbByID(id) {
  const { rows } = await query('select * FROM meals where id = $1', [id]);
  return rows[0];
}

async function dBlikeMeal(id) {
  const { rows } = await query('UPDATE meals SET likes = likes + 1 WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

async function dBdislikeMeal(id) {
  const { rows } = await query('UPDATE meals SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}
async function dBpostMeal(name, description, price, image) {
  const { rows } = await query('INSERT INTO meals (name,description,price,image) VALUES ($1, $2,$3,$4) returning *', [name, description, price, image]);
  return rows[0];
}

async function dBpatchMeal(name, description, price, id) {
  const { rows } = await query('UPDATE meals SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING *', [name, description, price, id]);
  return rows[0];
}

export { dBgetMeals, dBgetLikedMeals, dBdeleteMeal, dBpostMeal, dBgetMealbByID, dBpatchMeal, dBdislikeMeal, dBlikeMeal };
