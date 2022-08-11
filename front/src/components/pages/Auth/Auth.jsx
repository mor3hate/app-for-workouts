import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Alert from '../../ui/Alerts/Alert'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import authBgImg from '../../../images/auth.jpg'
import styles from '../Auth/Auth.module.scss'

import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import { $api } from '../../../api/axios'
import Loader from '../../ui/Loader/Loader'
import { useAuth } from '../../../hooks/useAuth'

const Auth = () => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [type, setType] = useState('auth')
	const navigate = useNavigate()
	const { setIsAuth } = useAuth()

	const {
		mutate: register,
		isLoading,
		error,
		isSuccess,
	} = useMutation(
		() =>
			$api({
				url: '/users',
				type: 'POST',
				body: { name, email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				localStorage.setItem('token', data.token)
				setIsAuth(true)
				setEmail('')
				setPassword('')
				setName('')

				navigate('/')
			},
			onError() {
				setPassword('')
			},
		}
	)

	const {
		mutate: auth,
		isLoading: isLoadingAuth,
		error: errorAuth,
	} = useMutation(
		() =>
			$api({
				url: '/users/login',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				localStorage.setItem('token', data.token)
				setIsAuth(true)
				setEmail('')
				setPassword('')

				navigate('/')
			},
			onError() {
				setPassword('')
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()
		if (type === 'auth') {
			auth()
		} else {
			register()
		}
	}

	return (
		<>
			<Layout bgImage={authBgImg} heading='Auth | | Register' />
			<div className='wrapper-inner'>
				{error && <Alert type='error' text={error} />}
				{errorAuth && <Alert type='error' text={errorAuth} />}
				{(isLoading || isLoadingAuth) && <Loader />}
				<form className='form' onSubmit={handleSubmit}>
					{isSuccess ? (
						''
					) : (
						<Field
							placeholder='Enter login'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					)}
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
