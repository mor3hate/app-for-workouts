import React, { useState } from 'react'
import Layout from '../../common/Layout'
import ReactSelect from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'

import newWorkoutBgImg from '../../../images/create-new-workout.jpg'
import styles from '../NewWorkout/NewWorkout.module.scss'

import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import { $api } from '../../../api/axios'
import Alert from '../../ui/Alerts/Alert'
import Loader from '../../ui/Loader/Loader'

const NewWorkout = () => {
	const [name, setName] = useState('')
	const [exercisesCurrent, setExercisesCurrent] = useState([])
	const navigate = useNavigate()

	const { data, isSuccess } = useQuery(
		['list exercises'],
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: addNewWorkout,
		isLoading,
		error,
		isSuccess: isSuccessMutate,
	} = useMutation(
		['post workout'],
		({ exIds }) =>
			$api({
				url: '/workouts',
				type: 'POST',
				body: { name, exercisesIds: exIds },
			}),
		{
			onSuccess() {
				setName('')
				setExercisesCurrent([])
			},
			onError() {
				setName('')
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()

		const exIds = exercisesCurrent.map(item => item.value)

		addNewWorkout({
			exIds,
		})
	}

	return (
		<>
			<Layout
				bgImage={newWorkoutBgImg}
				heading='Create new workout'
				back={'/'}
			/>
			<div className='wrapper-inner'>
				{isSuccessMutate && <Alert text='Workout created' />}
				{error && <Alert type='error' text={error} />}
				{isLoading && <Loader />}
				<form className='form' onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<p className={styles.link} onClick={() => navigate('/new-exercise')}>
						Add new exercise &#8594;
					</p>
					{isSuccess && data && (
						<ReactSelect
							classNamePrefix='react-select'
							placeholder='Exercises'
							title='Exercises'
							options={data.map(item => ({
								value: item._id,
								label: (
									<div className={styles.label}>
										<img
											src={`/uploads/${item.imageName}.svg`}
											alt={item.imageName}
											style={{ height: 24 }}
										/>
										{item.name}
									</div>
								),
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent}
							isMulti={true}
						/>
					)}
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
