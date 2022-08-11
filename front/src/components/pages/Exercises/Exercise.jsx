import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import debounce from 'lodash/debounce'

import { $api } from '../../../api/axios'
import Header from '../../common/Header/Header'
import Alert from '../../ui/Alerts/Alert'
import stylesLayout from '../../common/Layout.module.scss'

import bgImage from '../../../images/exercise-page.jpg'
import checkboxCompletedImg from '../../../images/exercise/checkbox-completed.svg'
import checkboxImg from '../../../images/exercise/checkbox.svg'
import styles from './Exercise.module.scss'

const Exercise = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data, isSuccess, refetch } = useQuery(
		['get exercise log'],
		() =>
			$api({
				url: `/exercises/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { mutate, error: errorPut } = useMutation(
		['change log'],
		({ timeIndex, key, value }) =>
			$api({
				url: `/exercises/log`,
				type: 'PUT',
				body: { timeIndex, key, value, logId: id },
			}),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	const { mutate: exCompleted, error: errorCompleted } = useMutation(
		['change complete log'],
		() =>
			$api({
				url: `/exercises/log/completed`,
				type: 'PUT',
				body: { logId: id, completed: true },
			}),
		{
			onSuccess() {
				navigate(`/workout/${data.workoutLog}`)
			},
		}
	)

	useEffect(() => {
		if (
			isSuccess &&
			data.times.length === data.times.filter(time => time.completed).length &&
			data._id === id
		) {
			exCompleted()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.times, isSuccess])

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.other}`}
				style={{ height: 350, backgroundImage: `url(${bgImage})` }}
			>
				<Header backLink={-1} />
				{isSuccess && (
					<div className={styles.heading}>
						<img
							src={`/uploads/${data.exercise.imageName}.svg`}
							alt={data.exercise.imageName}
							height='44'
						/>
						<h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
					</div>
				)}
			</div>
			<div className='wrapper-inner'>
				{errorPut && <Alert type='error' text={errorPut} />}
				{errorCompleted && <Alert type='error' text={errorCompleted} />}
				{isSuccess ? (
					<div className={styles.wrapper}>
						<div className={styles.row}>
							<div>
								<span>Previous</span>
							</div>
							<div>
								<span>Weight & Repeat</span>
							</div>
							<div>
								<span>Completed</span>
							</div>
						</div>

						{data.times.map((item, idx) => (
							<div
								className={cn(styles.row, {
									[styles.row__completed]: item.completed,
								})}
								key={`row ${idx}`}
							>
								<div className={styles.opacity}>
									<input type='number' value={item.prevWeight} disabled />
									<i>{item.completed ? 'kg/' : 'kg /'}</i>
									<input type='number' value={item.prevRepeat} disabled />
								</div>
								<div className={styles.opacity}>
									<input
										type='tel'
										defaultValue={item.weight}
										onChange={debounce(
											e =>
												e.target.value &&
												mutate({
													timeIndex: idx,
													key: 'weight',
													value: e.target.value,
												}),
											1000
										)}
										disabled={item.completed}
									/>
									<i>{item.completed ? 'kg/' : 'kg /'}</i>
									<input
										type='tel'
										defaultValue={item.repeat}
										onChange={debounce(
											e =>
												e.target.value &&
												mutate({
													timeIndex: idx,
													key: 'repeat',
													value: e.target.value,
												}),
											1000
										)}
										disabled={item.completed}
									/>
								</div>
								<div>
									<img
										src={item.completed ? checkboxCompletedImg : checkboxImg}
										alt='checkbox'
										className={styles.checkbox}
										onClick={() =>
											mutate({
												timeIndex: idx,
												key: 'completed',
												value: !item.completed,
											})
										}
									/>
								</div>
							</div>
						))}
					</div>
				) : (
					<Alert type='warning' text='Times not found' />
				)}
			</div>
		</>
	)
}

export default Exercise
