import React from 'react'
import cn from 'classnames'
import Header from './Header/Header'
import styles from './Layout.module.scss'

const Layout = ({
	children,
	height = '350px',
	bgImage,
	heading = '',
	back,
}) => {
	return (
		<div
			className={cn(styles.wrapper, {
				[styles.other]: !!heading,
			})}
			style={{ height, backgroundImage: `url(${bgImage})` }}
		>
			<Header backLink={back} />
			{heading && <h1 className={styles.heading}>{heading}</h1>}
			{children && <div>{children}</div>}
		</div>
	)
}

export default Layout
