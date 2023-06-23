import './App.css' 
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
const router=createBrowserRouter([
   { 
    path:'/', element: <NombreComponente /> 
  }, 
]) 

export function App(){
  return ( 
    <Layout> 
      <RouterProvider router={router}/> 
    </Layout> 
  ) 
}