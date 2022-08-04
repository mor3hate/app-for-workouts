import React, { useState } from 'react'
import Layout from '../../common/Layout'
import ReactSelect from 'react-select'
import { useNavigate } from 'react-router-dom'

import newWorkoutBgImg from '../../../images/create-new-workout.jpg'
import styles from '../NewWorkout/NewWorkout.module.scss'

import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

const NewWorkout = () => {
	const [name, setName] = useState('')
	const [exercises, setExercises] = useState('')
	const navigate = useNavigate()

	return (
		<>
			<Layout bgImage={newWorkoutBgImg} heading='Create new workout' />
			<div className='wrapper-inner'>
				<form className='form'>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<p className={styles.link} onClick={() => navigate('/new-exercise')}>
						Add new exercise &#8594;
					</p>
					<ReactSelect
						classNamePrefix='react-select'
						placeholder='Exercises'
						title='Exercises'
						options={[
							{ value: '45454545', label: 'Push-ups' },
							{ value: '888888', label: 'Pull-ups' },
						]}
						value={exercises}
						onChange={setExercises}
						isMulti={true}
					/>
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
