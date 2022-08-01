import React from 'react'
import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import arrowBack from '../../../images/header/arrow.svg'
import Hamburger from './Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img src={arrowBack} alt='Back' />
				</button>
			) : (
				<button type='button'>
					<img src={userImage} alt='Auth' />
				</button>
			)}
			<Hamburger />
		</header>
	)
}

export default Header
