import React from 'react'
import styles from './Counter.module.scss'

const counters = {
	minutes: 5,
	workouts: 7,
	kgs: 3,
}

const Counter = () => {
	return (
		<div className={styles.counters}>
			{Object.entries(counters).map(item => (
				<div className={styles.count} key={'key' + item[0]}>
					<div className={styles.heading}>{item[0]}</div>
					<div className={styles.number}>{item[1]}</div>
				</div>
			))}
		</div>
	)
}

export default Counter
