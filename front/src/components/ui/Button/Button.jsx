import React from 'react'
import styles from './Button.module.scss'

const Button = ({ text, callback, type = 'purple' }) => {
	return (
		<button onClick={callback} className={`${styles.button} ${styles[type]}`}>
			{text}
		</button>
	)
}

export default Button
