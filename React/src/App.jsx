
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { ListPlanes } from './components/Plan/ListPlanes'
import { DetailMovie } from './components/Plan/DetailPlan'
import TableMovies from './components/Plan/TableMovies'
import { FormMovie } from './components/Plan/FormMovie'
const router=createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/planes/',
    element: <ListPlanes/>
  },
  {
    path:'/planes-table',
    element: <TableMovies />
  },
  {
    path: 'planes/create/',
    element: <FormMovie/>
  },
  {
    path:'/planes/:id',
    element: <DetailMovie />
  },
  {
    path: 'planes/update/:id',
    element: <FormMovie/>
  },
])

function App() {
 
  return (
    <>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </>
  )
}

export default App