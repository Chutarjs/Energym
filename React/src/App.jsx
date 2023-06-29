
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { ListMovies } from './components/Movie/ListMovies'
import { DetailMovie } from './components/Movie/DetailMovie'
import TableMovies from './components/Movie/TableMovies'
import { FormMovie } from './components/Movie/FormMovie'
const router=createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/movie/',
    element: <ListMovies />
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