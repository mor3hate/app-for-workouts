import { useState, useEffect } from 'react'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import styles from '../Alerts/Alert.module.scss'

const Alert = ({ type = 'success', text }) => {
	const [show, isShow] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			isShow(true)
		}, 3000)

		return () => clearTimeout(timeout)
	}, [show])

	return (
		<CSSTransition in={!show} timeout={300} classNames='alert' unmountOnExit>
			<div
				className={cn(styles.alert, {
					[styles.error]: type === 'error',
					[styles.warning]: type === 'warning',
					[styles.info]: type === 'info',
				})}
			>
				{text}
			</div>
		</CSSTransition>
	)
}

export default Alert
