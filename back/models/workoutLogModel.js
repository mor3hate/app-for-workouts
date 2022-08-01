import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutLogSchema = mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true,
	},
	workout: {
		type: ObjectId,
		ref: 'Workout',
		required: true,
	},
	completed: {
		type: Boolean,
		default: true,
	},
	exerciseLogs: [
		{
			type: ObjectId,
			ref: 'ExerciseLog',
		},
	],
})

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema)

export default WorkoutLog
