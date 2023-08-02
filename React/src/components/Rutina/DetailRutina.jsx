// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RutinaService from "../../services/RutinaService";

export function DetailRutina() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const routeParams = useParams();

  useEffect(() => {
    RutinaService.getRutinaDetalle(routeParams.id)
      .then((response) => {
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

  const renderExerciseImages = (imagenes) => {
    return imagenes.map((imagen, index) => (
      <img
        key={index}
        src={`data:image/png;base64, ${imagen.Imagen}`}
        alt="Exercise Image"
        style={{ width: "100%", maxWidth: "150px" }}
      />
    ));
  };

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
            {"Rutina: " + data.Nombre}
          </Typography>
          <Typography variant="subtitle1" component="h1" gutterBottom>
            {"Descripcion: " + data.Descripcion}
          </Typography>
          <Typography variant="subtitle1" component="h1" gutterBottom>
            {"Cantidad de personas inscritas: " +
              data.cantPersonas[0].CantidadPersonas}
          </Typography>
          <Typography variant="body1">
            <Box fontWeight="bold">Ejercicios: </Box>
            <List
              sx={{
                width: "100%",
                maxWidth: "700px",
                bgcolor: "background.paper",
                margin: "0 auto",
              }}
            >
              {data.ejercicios.map((item) => (
                <ListItemButton key={item.IdEjercicio}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.Ejercicio}
                    secondary={
                      <div>
                        Descripcion: {item.Descripcion}
                        <br /><br />
                        Repeticiones: {item.Repeticiones}x{item.Series}
                        <br /><br />
                        Equipamiento: {item.Equipamiento}
                      </div>
                    }
                  />
                  {renderExerciseImages(item.imagenes)}
                </ListItemButton>
              ))}
            </List>
          </Typography>
        </Container>
      )}
    </>
  );
}
