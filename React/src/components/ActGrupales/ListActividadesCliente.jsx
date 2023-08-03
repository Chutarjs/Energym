/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import ActGrupalesService from "../../services/ActGrupalesService";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PeopleIcon from "@mui/icons-material/People";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { Info } from "@mui/icons-material";

export function ListActividadesCliente() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false); // Estado para mostrar solo actividades con cupo disponible

  useEffect(() => {
    ActGrupalesService.getDetalle()
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
  }, []);

  const handleToggleAvailable = () => {
    setShowAvailable(!showAvailable);
  };

  // Obtener la fecha actual en formato yyyy-mm-dd
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {!loaded && <div>Cargando...</div>}
      {console.log(data)}
      {data &&
        data
          .filter(
            (item) =>
              showAvailable ||
              (item.Cupo > item.cantidad_matriculados &&
                item.Fecha >= currentDate)
          ) // Filtrar los datos según el estado showAvailable y la fecha de inicio
          .map((item) => (
            <Grid item xs={4} key={item.idActividadGrupal}>
              <Card>
                <CardHeader
                  sx={{
                    p: 0,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.common.white,
                  }}
                  style={{ textAlign: "center" }}
                  title={item.Nombre}
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {item.Descripcion}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <EventIcon />
                    {item.Fecha}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <HourglassTopIcon /> {item.HoraInicio}
                    <HourglassBottomIcon /> {item.HoraFinal}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <PeopleIcon />
                    {" Cupo : " + item.Cupo}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                  >
                    <EmojiPeopleIcon />
                    {" Matriculados : " + item.cantidad_matriculados}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    backgroundColor: (theme) => theme.palette.action.focus,
                    color: (theme) => theme.palette.common.white,
                  }}
                >
                  <IconButton
                    component={Link}
                    to={`/actividades/matricular/${item.idActividadGrupal}`}
                    aria-label="Matricular"
                  >
                    <CheckIcon />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      ml={1}
                    >
                      Matricular
                    </Typography>
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/actividades/${item.idActividadGrupal}`}
                    aria-label="Informacion"
                  >
                    <Info />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      ml={1}
                    >
                      Informacion
                    </Typography>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
    </Grid>
  );
}
