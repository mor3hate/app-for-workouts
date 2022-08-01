import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import styles from './Home.module.scss'
import mainImage from '../../../images/home-image.jpg'
import Counter from '../../ui/Counters/Counter'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()
	return (
		<Layout height='100%' bgImage={mainImage}>
			<Button
				text='New'
				type='main'
				callback={() => navigate('/new-workout')}
			/>
			<h1 className={styles.title}>Exercise for the shoulders</h1>
			<Counter />
		</Layout>
	)
}

export default Home
