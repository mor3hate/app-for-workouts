import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import styles from './Home.module.scss'
import mainImage from '../../../images/home-image.jpg'
import Counter from '../../ui/Counters/Counter'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/axios'
import { useAuth } from '../../../hooks/useAuth'

const Home = () => {
	const navigate = useNavigate()
	const { isAuth } = useAuth()

	const { data, isSuccess } = useQuery(
		['home page counter'],
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
			enabled: isAuth,
		}
	)

	return (
		<Layout height='100vh' bgImage={mainImage}>
			<Button
				text='New'
				type='main'
				callback={() => navigate('/new-workout')}
			/>
			<h1 className={styles.title}>Exercise for the shoulders</h1>
			{isSuccess && isAuth && (
				<Counter
					minutes={data.minutes}
					workouts={data.workouts}
					kgs={data.kgs}
				/>
			)}
		</Layout>
	)
}

export default Home
