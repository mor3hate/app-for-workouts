import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import mainImage from '../../../images/home-image.jpg'
import chestImage from '../../../images/workout-images/chest-workout.jpg'
import shoulderImage from '../../../images/workout-images/shoulders.jpg'
import bicepsImage from '../../../images/workout-images/biceps.jpg'
import legImage from '../../../images/workout-images/legs.jpg'
import cardioImage from '../../../images/workout-images/cardio.jpg'
import styles from './Workout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import cn from 'classnames'

import { $api } from '../../../api/axios'
import Header from '../../common/Header/Header'
import Alert from '../../ui/Alerts/Alert'
import Loader from '../../ui/Loader/Loader'

const Workout = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [name, setName] = useState('')

	const { data, isSuccess, isLoading } = useQuery(
		['get workout'],
		() =>
			$api({
				url: `/workouts/log/${id}`,
			}),
		{
			onSuccess(data) {
				setName(data.workout.name)
			},
			refetchOnWindowFocus: false,
		}
	)

	const { mutate } = useMutation(
		() =>
			$api({
				url: '/workouts/log/completed',
				type: 'PUT',
				body: { logId: id },
			}),
		{
			onSuccess() {
				navigate(`/workouts`)
			},
		}
	)

	useEffect(() => {
		if (
			isSuccess &&
			data?.exerciseLogs &&
			data.exerciseLogs.length ===
				data.exerciseLogs.filter(log => log.completed).length &&
			data._id === id
		) {
			mutate()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.exerciseLogs])

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.other}`}
				style={{
					height: 350,
					backgroundImage: `url(${
						name.match(/chest/gi)
							? chestImage
							: name.match(/shoulder/gi)
							? shoulderImage
							: name.match(/hands/gi || /biceps/gi)
							? bicepsImage
							: name.match(/legs/gi)
							? legImage
							: name.match(/cardio/gi || /running/gi)
							? cardioImage
							: mainImage
					})`,
				}}
			>
				<Header backLink='/workouts' />
				{isSuccess && (
					<div>
						<time className={styles.time}>{`${data.minutes} min.`}</time>
						<h1 className={stylesLayout.heading}>{data.workout.name}</h1>
					</div>
				)}
			</div>
			<div className='wrapper-inner'>
				{isLoading || (isSuccess && data._id !== id) ? (
					<Loader />
				) : (
					<div>
						{data.exerciseLogs.map(item => {
							return (
								<div
									className={cn('exercise-badge', {
										'exercise-badge finished': item.completed,
									})}
									key={`ex ${item._id}`}
									title='Go to exercise'
									onClick={() => navigate(`/exercise/${item._id}`)}
								>
									<span>{item.exercise.name}</span>
									<img
										src={`/uploads/${item.exercise.imageName}.svg`}
										alt={item.imageName}
										height='34'
									/>
								</div>
							)
						})}
					</div>
				)}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Exercises not found' />
				)}
			</div>
		</>
	)
}

export default Workout
