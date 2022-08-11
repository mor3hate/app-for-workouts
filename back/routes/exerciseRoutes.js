import express from 'express'
import {
	addNewExercise,
	deleteExercise,
	getExercises,
	updateExercises,
} from '../controllers/exercise/exerciseController.js'
import {
	addNewExerciseLog,
	deleteExerciseLog,
	getExerciseLog,
} from '../controllers/exercise/exerciseLogController.js'
import {
	updateNewExerciseLog,
	updateCompleteExerciseLog,
} from '../controllers/exercise/exerciseUpdateController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router
	.route('/')
	.post(protect, addNewExercise)
	.put(protect, updateExercises)
	.delete(protect, deleteExercise)
	.get(protect, getExercises)

router
	.route('/log')
	.post(protect, addNewExerciseLog)
	.put(protect, updateNewExerciseLog)

router.route('/log/completed').put(updateCompleteExerciseLog)

router
	.route('/log/:id')
	.get(protect, getExerciseLog)
	.delete(protect, deleteExerciseLog)
export default router
