
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { ListPlanes } from './components/Plan/ListPlanes'
import { DetailMovie } from './components/Plan/DetailMovie'
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
    path:'/movie-table',
    element: <TableMovies />
  },
  {
    path: 'movie/create/',
    element: <FormMovie/>
  },
  {
    path:'/movie/:id',
    element: <DetailMovie />
  },
  {
    path: 'movie/update/:id',
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