import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

export function DetailUser() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const routeParams = useParams();

  useEffect(() => {
    UsuarioService.getUserById(routeParams.id)
      .then((response) => {
        console.log(response);
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [routeParams.id]);

  return (
    <>
      {!loaded && <div>Cargando...</div>}
      {data && (
        <div>
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
              {"Informacion Personal"}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Identificacion: " + data.id}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Nombre Completo: " + data.Nombre + " " + data.Apellidos}
            </Typography>
            {console.log(data)}
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Genero: " + (data.Genero == "1" ? "Hombre" : "Mujer")}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Fecha de Nacimiento: " + data.Nacimiento}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Telefono: " + data.Telefono}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {"Informacion Administrativa"}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Fecha de Inscripcion: " + data.FechaInscripcion}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Estado: " + (data.Activo == "1" ? "Activo" : "Inactivo")}
            </Typography>
            {data.plan != null ? (
              <div>
                <Typography variant="h4" component="h1" gutterBottom>
                  {"Plan Actual"}
                </Typography>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  {"Nombre: " + data.plan.Nombre}
                </Typography>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  {"Descripcion: " + data.plan.Descripcion}
                </Typography>
                <Typography variant="body1">
                  <Box fontWeight="bold">Servicios:</Box>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {data.plan.servicios.map((item) => (
                      <ListItemButton key={item.idServicio}>
                        <ListItemIcon>
                          <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.Nombre} />
                      </ListItemButton>
                    ))}
                  </List>
                </Typography>
              </div>
            ) : (
              <Typography variant="h4" component="h1" gutterBottom>
                {"No Posee Ningun Plan Asignado"}
              </Typography>
            )}
          </Container>
        </div>
      )}
    </>
  );
}
