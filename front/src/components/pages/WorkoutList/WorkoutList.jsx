import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import mainImage from '../../../images/workout-list.jpg'
import { AiFillDelete } from 'react-icons/ai'

import { $api } from '../../../api/axios'
import Alert from '../../ui/Alerts/Alert'
import Layout from '../../common/Layout'
import Loader from '../../ui/Loader/Loader'

const WorkoutList = () => {
	const navigate = useNavigate()

	const { data, isSuccess, refetch } = useQuery(
		['get workouts'],
		() =>
			$api({
				url: '/workouts',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		isSuccess: isSuccessMutate,
		isLoading,
	} = useMutation(
		({ workId }) =>
			$api({
				url: `/workouts/${workId}`,
				type: 'DELETE',
			}),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	const {
		mutate: createWorkoutLog,
		isLoading: isLoadingLog,
		error,
	} = useMutation(
		['Create new workout log'],
		({ workoutId }) =>
			$api({
				url: '/workouts/log',
				type: 'POST',
				body: { workoutId },
			}),
		{
			onSuccess(data) {
				navigate(`/workout/${data._id}`)
			},
		}
	)

	const handleDelete = id => {
		mutate({
			workId: id,
		})
	}

	return (
		<>
			<Layout bgImage={mainImage} heading='Workouts list' back='/' />
			<div className='wrapper-inner'>
				{(isLoading || isLoadingLog) && <Loader />}
				{isSuccessMutate && <Alert text='Workout removed' />}
				{error && <Alert text={error} />}
				{isSuccess &&
					data.map(item => {
						return (
							<div className='exercise-badge' key={`workout ${item.name}`}>
								<span
									onClick={() => {
										createWorkoutLog({
											workoutId: item._id,
										})
									}}
									title='Go to workout'
								>
									{item.name}
								</span>
								<AiFillDelete
									size='1.5em'
									title='Delete'
									onClick={() => handleDelete(item._id)}
								/>
							</div>
						)
					})}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default WorkoutList
