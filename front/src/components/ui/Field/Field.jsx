import React from 'react'
import styles from '../Field/Field.module.scss'

const Field = ({ type = 'text', placeholder, value, onChange }) => {
	return (
		<input
			className={styles.input}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}

export default Field
