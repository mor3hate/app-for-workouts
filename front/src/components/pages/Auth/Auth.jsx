import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Alert from '../../ui/Alerts/Alert'

import authBgImg from '../../../images/auth.jpg'
import styles from '../Auth/Auth.module.scss'

import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [type, setType] = useState('auth')

	const handleSubmit = e => {
		e.preventDefault()
		if (type === 'auth') {
			console.log('Auth')
		} else {
			console.log('Reg')
		}
	}

	return (
		<>
			<Layout bgImage={authBgImg} heading='Auth | | Register' />
			<div className='wrapper-inner'>
				{true && <Alert type='warning' text='Success' />}
				<form className='form' onSubmit={handleSubmit}>
					<Field
						placeholder='Enter email'
						value={email}
						required
						onChange={e => setEmail(e.target.value)}
					/>
					<Field
						placeholder='Enter password'
						type='password'
						value={password}
						required
						onChange={e => setPassword(e.target.value)}
					/>
					<div className={styles['wrapper-button']}>
						<Button text='Sign In' callback={() => setType('auth')} />
						<Button text='Sign Up' callback={() => setType('reg')} />
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
