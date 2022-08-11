import Auth from './components/pages/Auth/Auth'
import Exercise from './components/pages/Exercises/Exercise'
import Home from './components/pages/Home/Home'
import NewExercise from './components/pages/NewExercise/NewExercise'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Profile from './components/pages/Profile/Profile'
import Workout from './components/pages/Workout/Workout'
import WorkoutList from './components/pages/WorkoutList/WorkoutList'

export const route = [
	{
		path: '/',
		element: Home,
		exact: true,
		auth: false,
	},
	{
		path: '/new-workout',
		element: NewWorkout,
		exact: false,
		auth: true,
	},
	{
		path: '/auth',
		element: Auth,
		exact: false,
		auth: false,
	},
	{
		path: '/new-exercise',
		element: NewExercise,
		auth: true,
		exact: false,
	},
	{
		path: '/profile',
		element: Profile,
		auth: true,
		exact: false,
	},
	{
		path: '/workout/:id',
		element: Workout,
		auth: true,
		exact: false,
	},
	{
		path: '/workouts',
		element: WorkoutList,
		auth: true,
		exact: false,
	},
	{
		path: '/exercise/:id',
		element: Exercise,
		auth: true,
		exact: false,
	},
]
