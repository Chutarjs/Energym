
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
import { ListActividades } from './components/ActGrupales/ListActividades'
import {DetailActividad} from './components/ActGrupales/DetailActividad'
import {TableActividad} from './components/ActGrupales/TableActividad'
import {FormActividad} from './components/ActGrupales/FormActividad'
import {FormServicio} from './components/Servicios/FormServicio'
import {TableServicio} from './components/Servicios/TableServicio'
import {DetailServicio} from './components/Servicios/DetailServicio'

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
    path:'/plan-table',
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
    path:'/rutina-table',
    element: <TableRutina />
  },
  {
    path: 'rutina/create/',
    element: <FormRutina/>
  },
  {
    path:'/rutina/:id',
    element: <DetailRutina />
  },
  {
    path: 'rutina/update/:id',
    element: <FormRutina/>
  },{
    path:'/actividades/',
    element: <ListActividades/>
  },
  {
    path:'/actividad-table',
    element: <TableActividad />
  },
  {
    path: 'actividad/create/',
    element: <FormActividad/>
  },
  {
    path:'/actividades/:id',
    element: <DetailActividad />
  },
  {
    path: 'actividad/update/:id',
    element: <FormActividad/>
  },
  {
    path:'/servicio-table',
    element: <TableServicio/>
  },
  {
    path: 'servicio/create/',
    element: <FormServicio/>
  },
  {
    path: 'servicio/update/:id',
    element: <FormServicio/>
  },
  {
    path:'/servicio/:id',
    element: <DetailServicio />
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