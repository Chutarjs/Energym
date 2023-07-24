// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import EjercicioService from "../../services/EjercicioService";

export function DetailEjercicio() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const routeParams = useParams();

  //se obtiene el ejercicio (con todos sus atributos y sus imagenes en base 64, se convierten en el controller)
  useEffect(() => {
    EjercicioService.getEjercicioById(routeParams.id)
      .then((response) => {
        //se asignan los datos al form
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

  //se renderizan las imagenes para mostrarlas en el html
  const renderExerciseImages = (imagenes) => {
    return (
      <img
        src={`data:image/png;base64, ${imagenes.Imagen}`}
        alt="Exercise Image"
        style={{
          width: "100%",
          maxWidth: "150px",
          display: "block",
          margin: "0 auto",
        }}
      />
    );
  };

  //el html a mostrar
  return (
    <>
      {!loaded && <div>Cargando...</div>}
      {data && (
        <Container
          component="main"
          sx={{ mt: 8, mb: 2, display: "block", textAlign: "center" }}
          maxWidth="lg"
        >
          
          <Typography variant="h4" component="h1" gutterBottom>
            {"Ejercicio: " + data.Nombre}
          </Typography>

          <Typography variant="subtitle1" component="h1" gutterBottom>
            {"Descripcion: " + data.Descripcion}
          </Typography>

          <Typography variant="subtitle1" component="h1" gutterBottom>
            {"Equipamiento: " + data.Equipamiento}
          </Typography>

          <Typography variant="body1">
            <Box fontWeight="bold">Imagenes: </Box>
            <List
              sx={{
                width: "50%",
                bgcolor: "background.paper",
                margin: "0 auto",
              }}
            >
              {data.imagenes.map((item) => (
                <ListItemButton key={data.idEjercicio}>
                  {renderExerciseImages(item)}
                </ListItemButton>
              ))}
            </List>
          </Typography>

        </Container>
      )}
    </>
  );
}
