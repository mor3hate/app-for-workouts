import React from 'react'
import styles from '../Loader/Loader.module.scss'

const Loader = () => {
	return (
		<div className={styles['lds-ripple']}>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loader
