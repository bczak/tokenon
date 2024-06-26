import {AppRoot} from '@telegram-apps/telegram-ui'
import React, {useEffect, useMemo} from 'react'
import {useIntegration} from '@tma.js/react-router-integration'
import {
	bindMiniAppCSSVars,
	bindThemeParamsCSSVars,
	bindViewportCSSVars,
	initNavigator,
	useLaunchParams,
	useMiniApp,
	useThemeParams,
	useViewport
} from '@tma.js/sdk-react'
import {
	Navigate,
	Route,
	Router,
	Routes
} from 'react-router-dom'

import {routes} from '@/navigation/routes.tsx'
import {Footer} from '@/components/footer'


export const App: React.FC = () => {
	const miniApp = useMiniApp()
	const lp = useLaunchParams()
	const themeParams = useThemeParams()
	const viewport = useViewport()

	useEffect(() => {
		return bindMiniAppCSSVars(miniApp, themeParams)
	}, [miniApp, themeParams])

	useEffect(() => {
		return bindThemeParamsCSSVars(themeParams)
	}, [themeParams])

	useEffect(() => {
		return viewport && bindViewportCSSVars(viewport)
	}, [viewport])

	// Create new application navigator and attach it to the browser history, so it could modify
	// it and listen to its changes.
	const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
	const [location, reactNavigator] = useIntegration(navigator)

	// Don't forget to attach the navigator to allow it to control the BackButton state as well
	// as browser history.
	useEffect(() => {
		navigator.attach()
		return () => navigator.detach()
	}, [navigator])

	return (
		<Router location={location} navigator={reactNavigator}>
			<AppRoot
				style={{
				}}
				appearance={miniApp.isDark ? 'dark' : 'light'}
				platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
			>
				<Routes>
					{routes.map((route) => <Route key={route.path} {...route} />)}
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
				<Footer/>
			</AppRoot>
		</Router>
	)
}
