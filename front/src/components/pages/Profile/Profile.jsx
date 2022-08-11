import React from 'react'
import { useQuery } from '@tanstack/react-query'

import profileImg from '../../../images/profile.jpg'
import styles from './Profile.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import userImg from '../../../images/header/user.svg'

import { $api } from '../../../api/axios'
import Counter from '../../ui/Counters/Counter'
import Header from '../../common/Header/Header'

const Profile = () => {
	const { data, isSuccess } = useQuery(
		['list statistics'],
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { data: getWorkoutData } = useQuery(
		['get workouts profile'],
		() =>
			$api({
				url: '/workouts',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.other}`}
				style={{ height: 350, backgroundImage: `url(${profileImg})` }}
			>
				<Header backLink='/' />
				<div className={styles.center}>
					<img src={userImg} alt='Auth' style={{ height: 70 }} />
					{isSuccess && <h1 className={stylesLayout.heading}>{data.name}</h1>}
				</div>
				{isSuccess && (
					<Counter
						minutes={data.minutes}
						workouts={data.workouts}
						kgs={data.kgs}
						type='profile'
					/>
				)}
			</div>
			<div className='wrapper-inner'>
				<h1 className={styles.heading}>Your workouts list</h1>
				{getWorkoutData?.map(item => (
					<div className={'exercise-badge'} key={`workout profile ${item._id}`}>
						<span>{item.name}</span>
					</div>
				))}
			</div>
		</>
	)
}

export default Profile
