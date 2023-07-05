
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { ListPlanes } from './components/Plan/ListPlanes'
import { DetailMovie } from './components/Plan/DetailPlan'
import TablePlan from './components/Plan/TablePlan'
import { FormPlan } from './components/Plan/FormPlan'
import { ListRutinas } from './components/Rutina/ListRutinas'
import {DetailRutina} from './components/Rutina/DetailRutina'
import {TableRutina} from './components/Rutina/TableRutina'
import {FormRutina} from './components/Rutina/FormRutina'

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
    element: <TablePlan />
  },
  {
    path: 'planes/create/',
    element: <FormPlan/>
  },
  {
    path:'/planes/:id',
    element: <DetailMovie />
  },
  {
    path: 'planes/update/:id',
    element: <FormPlan/>
  },
  {
    path:'/rutinas/',
    element: <ListRutinas/>
  },
  {
    path:'/rutinas-table',
    element: <TableRutina />
  },
  {
    path: 'rutinas/create/',
    element: <FormRutina/>
  },
  {
    path:'/rutinas/:id',
    element: <DetailRutina />
  },
  {
    path: 'rutinas/update/:id',
    element: <FormRutina/>
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