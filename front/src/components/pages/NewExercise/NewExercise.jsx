import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { useMutation } from '@tanstack/react-query'
import { $api } from '../../../api/axios'

import cn from 'classnames'
import styles from './NewExercise.module.scss'
import addExerciseImg from '../../../images/add-new-exercise.jpg'

import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import Alert from '../../ui/Alerts/Alert'
import Loader from '../../ui/Loader/Loader'

const exercisePics = ['chest', 'shoulders', 'biceps', 'legs', 'cardio']

const NewExercise = () => {
	const [name, setName] = useState('')
	const [times, setTimes] = useState(3)
	const [imageName, setImageName] = useState('chest')

	const {
		mutate: addExercise,
		isLoading,
		error,
		isSuccess,
	} = useMutation(
		['add new exercise'],
		() =>
			$api({
				url: '/exercises',
				type: 'POST',
				body: {
					name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
					times,
					imageName,
				},
				auth: true,
			}),
		{
			onSuccess() {
				setName('')
				setTimes(3)
			},
			onError() {
				setName('')
			},
		}
	)

	const handleNewExercise = e => {
		e.preventDefault()
		if (name && times && imageName) {
			addExercise()
		}
	}

	return (
		<>
			<Layout
				bgImage={addExerciseImg}
				heading='Add new exercise'
				back={'/new-workout'}
			/>
			<div className='wrapper-inner'>
				{isSuccess && <Alert text='Exercise created' />}
				{error && <Alert type='error' text={error} />}
				{isLoading && <Loader />}
				<form className='form' onSubmit={handleNewExercise}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Field
						type='number'
						value={times}
						onChange={e => setTimes(e.target.value)}
						required
					/>
					<div className={styles['img-wrapper']}>
						{exercisePics.map(item => (
							<img
								src={`/uploads/${item}.svg`}
								alt={item}
								key={`ex name ${item}`}
								className={cn({
									[styles.active]: imageName === item,
								})}
								onClick={() => setImageName(item)}
							/>
						))}
					</div>
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewExercise
