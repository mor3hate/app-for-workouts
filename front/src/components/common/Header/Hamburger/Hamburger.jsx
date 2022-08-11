import menuImage from '../../../../images/header/hamburger.svg'
import menuClose from '../../../../images/header/hamburger-close.svg'
import styles from './Hamburger.module.scss'
import { useNavigate } from 'react-router-dom'
import { useOutsideClick } from '../../../../hooks/outsideClick'
import { useAuth } from '../../../../hooks/useAuth'

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
	const { setIsAuth } = useAuth()
	const navigate = useNavigate()
	const { ref, isVisible, setIsVisible } = useOutsideClick(false)

	const logOut = () => {
		localStorage.removeItem('token')
		setIsAuth(false)
		setIsVisible(false)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button type='button' onClick={() => setIsVisible(!isVisible)}>
				<img src={isVisible ? menuClose : menuImage} alt='menu' height='24' />
			</button>
			<nav className={`${styles.menu} ${isVisible ? styles.show : ''}`}>
				{menu.map((item, i) => (
					<li key={`${item} ${i}`} onClick={() => navigate(item.link)}>
						{item.title}
					</li>
				))}
				<li>
					<button onClick={logOut}>Logout</button>
				</li>
			</nav>
		</div>
	)
}

export default Hamburger
