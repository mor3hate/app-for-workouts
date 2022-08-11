import { useContext } from 'react'
import { authContext } from '../context/AuthContext'

export const useAuth = () => {
	const { isAuth, setIsAuth } = useContext(authContext)

	return {
		isAuth,
		setIsAuth,
	}
}
