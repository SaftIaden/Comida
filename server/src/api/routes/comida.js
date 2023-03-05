import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { getMeals, getLikedMeals, deleteMeal, patchMeal, postMeal, dislikeMeal, likeMeal } from '../../../controller/comida.js';

// Konfiguration von Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get(
  '/test',
  asyncHandler((req, res) => res.status(200).send('it Works!')),
);

router.get('/meals', asyncHandler(getMeals));
router.get('/meals/likes', asyncHandler(getLikedMeals));
router.delete('/meals/:id', asyncHandler(deleteMeal));
router.patch('/meals/:id', asyncHandler(patchMeal));
router.post('/meals', upload.single('image'), asyncHandler(postMeal));
router.patch('/meals/:id/like', asyncHandler(likeMeal));
router.patch('/meals/:id/dislike', asyncHandler(dislikeMeal));

export default router;
