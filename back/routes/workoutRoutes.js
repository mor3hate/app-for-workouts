import express from 'express'
import {
	addNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout,
} from '../controllers/workout/workoutController.js'
import {
	addNewWorkoutLog,
	getWorkoutLog,
	updateWorkoutLog,
} from '../controllers/workout/workoutLogController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
	.route('/')
	.get(protect, getWorkouts)
	.post(protect, addNewWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

router.route('/log').post(protect, addNewWorkoutLog)

router.route('/log/completed').put(protect, updateWorkoutLog)

router.route('/:id').get(protect, getWorkout)

router.route('/log/:id').get(protect, getWorkoutLog)

export default router
