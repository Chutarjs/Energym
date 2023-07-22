import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServicioService from "../../services/ServicioService";

export function DetailServicio() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const routeParams = useParams();

  useEffect(() => {
    ServicioService.getServicioById(routeParams.id)
      .then((response) => {
        console.log(response.data.results);
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
              {"Servicio: " + data[0].Nombre}
            </Typography>

            <Typography variant="subtitle1" component="h1" gutterBottom>
              {"Descripcion: " + data[0].Descripcion}
            </Typography>

            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Tipo:
              </Box>{" "}
              {data[0].Tipo}
            </Typography>

            <Typography variant="body1">
              <Box fontWeight="bold" display="inline">
                Precio:
              </Box>{" "}
              ₡{data[0].Precio}
            </Typography>

            <Typography variant="body1">
              <Box fontWeight="bold">Imagen: </Box>
              <img
                src={`data:image/png;base64, ${data[0].Imagen}`}
                alt="Exercise Image"
                style={{ width: "100%", maxWidth: "350px" }}
              />
            </Typography>
          </Container>
        </div>
      )}
    </>
  );
}
