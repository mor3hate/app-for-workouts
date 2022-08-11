import Workout from '../../models/workoutModel.js'
import asyncHandler from 'express-async-handler'
// @desc Add new workout
// @route POST /api/workouts
// @access Private
export const addNewWorkout = asyncHandler(async (req, res) => {
	const { name, exercisesIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exercisesIds,
	})

	res.json(workout)
})
// @desc Get workout
// @route Get /api/workouts/:id
// @access Private

export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await Workout.findById(req.params.id)
		.populate('exercises')
		.lean()

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена')
	}

	const minutes = Math.ceil(workout.exercises.length * 3.7)

	res.json({ ...workout, minutes })
})

// @desc Update workout
// @route PUT /api/workouts
// @access Private

export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseId, workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена')
	}

	workout.name = name
	workout.exercises = exerciseId

	const updatedWorkout = await workout.save()

	res.json(updatedWorkout)
})

// @desc Delete workout
// @route DELETE /api/workout/:id
// @access Private

export const deleteWorkout = asyncHandler(async (req, res) => {
	const workout = await Workout.findById(req.params.id)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена')
	}

	await workout.remove()

	res.json({ message: 'Данная тренировка удалена' })
})

// @desc Get workouts
// @route Get /api/workouts
// @access Private

export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await Workout.find({}).populate('exercises')

	res.json(workouts)
})
