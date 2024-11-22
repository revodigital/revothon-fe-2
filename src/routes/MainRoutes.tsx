// example routing
// const LazyComponent = Loadable(lazy(() => import('../views/example')))

// ==============================|| MAIN ROUTING ||============================== //

import MinimalLayout from "layout/MinimalLayout"
import { lazy } from "react"
import Loadable from "ui-components/common/Loadable"

const LazyComponent = Loadable(lazy(() => import('../views/licensePlateReader')))

const MainRoutes = {
    path: '/path',
    element: (
        <MinimalLayout />
    ),
    children: [
        {
            path: '/path/di/test',
            element: <LazyComponent/>
        }
    ]
}

export default MainRoutes

