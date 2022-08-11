import React from 'react'
import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import userAuthTrueImg from '../../../images/header/user-auth-true.svg'
import arrowBack from '../../../images/header/arrow.svg'
import Hamburger from './Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const Header = ({ backLink }) => {
	const location = useLocation()
	const navigate = useNavigate()

	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button title='Back' type='button' onClick={() => navigate(backLink)}>
					<img src={arrowBack} alt='Back' />
				</button>
			) : (
				<button
					title='Login'
					type='button'
					onClick={() => navigate(isAuth ? '/profile' : '/auth')}
				>
					<img src={isAuth ? userAuthTrueImg : userImage} alt='Auth' />
				</button>
			)}
			<Hamburger />
		</header>
	)
}

export default Header
