import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewExercise from './components/pages/NewExercise/NewExercise'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/new-workout' element={<NewWorkout />} />
				<Route exact path='/new-exercise' element={<NewExercise />} />
				<Route exact path='/auth' element={<Auth />} />
			</Routes>
		</Router>
	)
}

export default App
