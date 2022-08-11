import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { route } from './routes'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const App = () => {
	const { isAuth } = useAuth()

	const location = useLocation()

	return (
		<TransitionGroup>
			<CSSTransition
				key={location.pathname}
				classNames='pages'
				timeout={1000}
				unmountOnExit
			>
				<Routes location={location}>
					{route.map(item => {
						if (item.auth && !isAuth) {
							return (
								<Route
									key={`route ${item.path}`}
									path={item.path}
									element={<Navigate to='/auth' />}
								/>
							)
						}
						return (
							<Route
								exact={item.exact}
								path={item.path}
								element={<item.element />}
								key={`route ${item.path}`}
							/>
						)
					})}
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	)
}

export default App
