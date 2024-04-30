// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Produk = lazy(() => import('../pages/protected/Produk'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/produk', // the url
    component: Produk, // view rendered
  },

]

export default routes
