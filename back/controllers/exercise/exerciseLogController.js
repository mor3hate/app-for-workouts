import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import { rebuildTimes } from '../../helpers/exerciseLog.js'

// @desc    Create new exerciseLog
// @route   POST /api/exercises/log
// @access  Private
export const addNewExerciseLog = asyncHandler(async (req, res) => {
	const { exerciseId, times } = req.body

	let timesArray = []

	for (let i = 0; i < times; i++) {
		timesArray.push({
			weight: 0,
			repeat: 0,
		})
	}

	const exerciseLog = await ExerciseLog.create({
		user: req.user._id,
		exercise: exerciseId,
		times: timesArray,
	})

	res.json(exerciseLog)
})

// @desc    get exerciseLog
// @route   GET /api/exercises/log/:id
// @access  Private
export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await ExerciseLog.findById(req.params.id).populate(
		'exercise',
		'name imageId'
	)

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Лог не найден!')
	}

	const prevExerciseLog = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseLog._id,
	}).sort('desc')

	const prevExLog = prevExerciseLog[0]

	const log = exerciseLog.toObject()

	const rebuildTimes = (log, prevExLog = null) => {
		return log.times.map((item, index) => ({
			...item,
			prevWeight: prevExLog ? prevExLog.times[index].weight : 0,
			prevRepeat: prevExLog ? prevExLog.times[index].repeat : 0,
		}))
	}

	let newTimes = rebuildTimes(log)

	if (prevExLog) {
		newTimes = rebuildTimes(log, prevExLog)
	}

	res.json({
		...log,
		times: newTimes,
	})
})
