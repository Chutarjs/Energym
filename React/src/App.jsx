import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { ListPlanes } from "./components/Plan/ListPlanes";
import { DetailPlan } from "./components/Plan/DetailPlan";
import TablePlan from "./components/Plan/TablePlan";
import { FormPlan } from "./components/Plan/FormPlan";
import { ListRutinas } from "./components/Rutina/ListRutinas";
import { DetailRutina } from "./components/Rutina/DetailRutina";
import { TableRutina } from "./components/Rutina/TableRutina";
import { FormRutina } from "./components/Rutina/FormRutina";
import { ListActividades } from "./components/ActGrupales/ListActividades";
import { ListActividadesCliente } from "./components/ActGrupales/ListActividadesCliente";
import { DetailActividad } from "./components/ActGrupales/DetailActividad";
import { TableActividad } from "./components/ActGrupales/TableActividad";
import { FormActividad } from "./components/ActGrupales/FormActividad";
import { FormServicio } from "./components/Servicios/FormServicio";
import { TableServicio } from "./components/Servicios/TableServicio";
import { DetailServicio } from "./components/Servicios/DetailServicio";
import { TableEjercicio } from "./components/Ejercicio/TableEjercicio";
import { FormEjercicio } from "./components/Ejercicio/FormEjercicio";
import { DetailEjercicio } from "./components/Ejercicio/DetailEjercicio";
import { Unauthorized } from "./components/Usuarios/Unauthorized";
import { Login } from "./components/Usuarios/Login";
import { Signup } from "./components/Usuarios/Signup";
import { Logout } from "./components/Usuarios/Logout";
import UserProvider from "./components/Usuarios/UserProvider";
import { Auth } from "./components/Usuarios/Auth";
import { DetailUser } from "./components/Usuarios/DetailUser";
import  TableUsuario  from "./components/Usuarios/TableUsuario";
import { FormUsuario } from "./components/Usuarios/FormUsuarios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Empleado"]} />,
    children: [
      {
        path: "/plan-table",
        element: <TablePlan />,
      },
      {
        path: "planes/create/",
        element: <FormPlan />,
      },
      {
        path: "planes/update/:id",
        element: <FormPlan />,
      },
      {
        path: "/rutina-table",
        element: <TableRutina />,
      },
      {
        path: "rutina/create/",
        element: <FormRutina />,
      },
      {
        path: "rutina/update/:id",
        element: <FormRutina />,
      },
      {
        path: "/actividad-table",
        element: <TableActividad />,
      },
      {
        path: "actividad/create/",
        element: <FormActividad />,
      },
      {
        path: "actividad/update/:id",
        element: <FormActividad />,
      },
      {
        path: "/servicio-table",
        element: <TableServicio />,
      },
      {
        path: "servicio/create/",
        element: <FormServicio />,
      },
      {
        path: "servicio/update/:id",
        element: <FormServicio />,
      },
      {
        path: "/ejercicio-table",
        element: <TableEjercicio />,
      },
      {
        path: "ejercicio/create/",
        element: <FormEjercicio />,
      },
      {
        path: "ejercicio/update/:id",
        element: <FormEjercicio />,
      },
      {
        path: "/servicio/:id",
        element: <DetailServicio />,
      },
      {
        path: "/actividades/",
        element: <ListActividades />,
      },
      {
        path: "/user/detail/:id",
        element: <DetailUser />,
      },
      {
        path: "/usuario-table",
        element: <TableUsuario />,
      },
      {
        path: "/usuario/create",
        element: <FormUsuario/>,
      },
      {
        path: "/usuario/update/:id",
        element: <FormUsuario/>,
      },
    ],
  },

  {
    path: "/planes/",
    element: <ListPlanes />,
  },
  {
    path: "/planes/:id",
    element: <DetailPlan />,
  },
  {
    path: "/rutinas/",
    element: <ListRutinas />,
  },
  {
    path: "/rutina/:id",
    element: <DetailRutina />,
  },
  {
    path: "/actividades/:id",
    element: <DetailActividad />,
  },
  {
    path: "/ejercicio/:id",
    element: <DetailEjercicio />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/create",
    element: <Signup />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/user/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Cliente"]} />,
    children: [
      {
        path: "/actividadesGrupales/",
        element: <ListActividadesCliente />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Cliente", "Administrador", "Empleado"]} />,
    children: [
      {
        path: "/user/detail/:id",
        element: <DetailUser />,
      },
    ]
  }
]);

function App() {
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  );
}

export default App;
