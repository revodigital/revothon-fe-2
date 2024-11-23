// example routing
// const LazyComponent = Loadable(lazy(() => import('../views/example')))

// ==============================|| MAIN ROUTING ||============================== //

import MinimalLayout from 'layout/MinimalLayout'
import { lazy } from 'react'
import Loadable from 'ui-components/common/Loadable'
import Homepage from 'pages/Homepage'
import License from 'views/licensePlateReader/index'
import ScanError from 'pages/ScanError'
import Complete from 'pages/CompletePage'
import ScanExecuted from 'pages/ScanExecuted'
import NotRead from 'pages/NotRead'
import Questions from 'pages/Questions'

const LazyComponent = Loadable(lazy(() => import('../views/licensePlateReader')))

const MainRoutes = {
	path: '/',
	element: <MinimalLayout />,
	children: [
		{
			path: '/path/di/test',
			element: <LazyComponent />
		},
		{
			path: '/Error',
			element: <ScanError />
		},
		{
			path: '/',
			element: <Homepage />
		},
		{
			path: '/Complete',
			element: <Complete />
		},
		{
			path: '/Read',
			element: <NotRead />
		},
		{
			path: '/Questions',
			element: <Questions />
		},
		{
			path: '/scan-executed',
			element: <ScanExecuted />
		},
		{
			path: '/license',
			element: <License />
		}
	]
}

export default MainRoutes
