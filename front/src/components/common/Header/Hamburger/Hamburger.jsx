import React, { useState } from 'react'
import menuImage from '../../../../images/header/hamburger.svg'
import menuClose from '../../../../images/header/hamburger-close.svg'
import styles from './Hamburger.module.scss'
import { useNavigate } from 'react-router-dom'

const menu = [
	{
		title: 'Workouts',
		link: '/workouts',
	},
	{
		title: 'Create new',
		link: '/new-workout',
	},
	{
		title: 'Profile',
		link: '/profile',
	},
]

const Hamburger = () => {
	const [show, setShow] = useState(false)
	const navigate = useNavigate()

	const logOut = () => {
		console.log('logout')
	}

	return (
		<div className={styles.wrapper}>
			<button type='button' onClick={() => setShow(!show)}>
				<img src={show ? menuClose : menuImage} alt='menu' height='24' />
			</button>
			<nav className={`${styles.menu} ${show ? styles.show : ''}`}>
				{menu.map((item, i) => (
					<li key={i} onClick={() => navigate(item.link)}>
						{item.title}
					</li>
				))}
				<li>
					<a href='/' onClick={() => logOut}>
						Logout
					</a>
				</li>
			</nav>
		</div>
	)
}

export default Hamburger
