import { useState } from 'react'
import { authContext } from '../context/AuthContext'
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

	return (
		<authContext.Provider value={{ isAuth, setIsAuth }}>
			<Router>
				<App />
			</Router>
		</authContext.Provider>
	)
}

export default AppProvider
