/* eslint-disable no-unused-vars */
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlanService from "../../services/PlanService";
import Button from "@mui/material/Button";
import PagoService from "../../services/PagoService";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export function Matricular() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [matricular, setMatricular] = useState(false);
  const [disponible, setDisponible] = useState(true);

  const routeParams = useParams();
  //pagar
  const handleMatricular = () => {
    setMatricular(true);
  };

  useEffect(() => {
    //verificar que no tenga pagos pendientes
    
    //verificar que no tenga un plan asignado (planhistorial)

    //verificar que el plan que tenga actualmente no sea el que está intentando matricular

  })

  useEffect(() => {
    PlanService.getPlanById(routeParams.id)
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

  return (
    <>
      {!loaded && <div>Cargando...</div>}
      {data && (
        <div>
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
              {data.Nombre}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Descripcion: " + data.Descripcion}
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Precio:
              </Box>{" "}
              ₡{data.Precio}
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
                {data.servicios.map((item) => (
                  <ListItemButton key={item.idServicio}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.Nombre} />
                  </ListItemButton>
                ))}
              </List>
            </Typography>
            {disponible &&
              <Button
                variant="contained"
                color="primary"
                onClick={handleMatricular}
              >
                Matricular
              </Button>
            }
          </Container>
        </div>
      )}
    </>
  );
}
