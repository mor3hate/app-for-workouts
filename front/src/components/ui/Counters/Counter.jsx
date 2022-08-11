import styles from './Counter.module.scss'
import cn from 'classnames'

const Counter = ({ minutes, workouts, kgs, type }) => {
	return (
		<div
			className={cn(styles.counters, {
				[styles.profile]: type === 'profile',
			})}
		>
			<div className={styles.count}>
				<div className={styles.heading}>Minutes</div>
				<div className={styles.number}>{minutes}</div>
			</div>
			<div className={styles.count}>
				<div className={styles.heading}>Workouts</div>
				<div className={styles.number}>{workouts}</div>
			</div>
			<div className={styles.count}>
				<div className={styles.heading}>Kgs</div>
				<div className={styles.number}>{kgs}</div>
			</div>
		</div>
	)
}

export default Counter
