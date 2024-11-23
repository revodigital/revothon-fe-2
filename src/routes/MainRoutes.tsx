// example routing
// const LazyComponent = Loadable(lazy(() => import('../views/example')))

// ==============================|| MAIN ROUTING ||============================== //

import MinimalLayout from 'layout/MinimalLayout'
import { lazy } from 'react'
import Loadable from 'ui-components/common/Loadable'
import Homepage from 'pages/Homepage'
import License from 'views/licensePlateReader/index'

const LazyComponent = Loadable(lazy(() => import('../views/licensePlateReader')))

const MainRoutes = {
	path: '/path',
	element: <MinimalLayout />,
	children: [
		{
			path: '/path/di/test',
			element: <LazyComponent />
		},
		{
			path: '/path/homepage',
			element: <Homepage />
		},
		{
			path: '/path/license',
			element: <License />
		}
	]
}

export default MainRoutes
